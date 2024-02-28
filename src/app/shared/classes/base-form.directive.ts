import { Directive, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import {
  get,
  isNumber,
} from 'lodash';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { SnackBarSuffix } from './../models/common';

@Directive()
export abstract class BaseFormDirective<T> implements OnInit {

  isLoading: boolean;
  errorMessage: string;
  formGroup: FormGroup;
  formInfo: T;
  backRoute: string;
  backText: string;
  isEdit: boolean;

  abstract onSave(): void;
  abstract onCreate(): void;
  abstract onSaveAndExit(): void;

  constructor(
    private navigateTo: string,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.errorMessage = get(this.activatedRoute.snapshot.data.resolved, ['error']);
    this.formInfo = get(this.activatedRoute.snapshot.data.resolved, ['info'], {});
    this.isEdit = isNumber(this.formInfo['id']);
  }

  prepareForAsync() {
    this.errorMessage = null;
    this.isLoading = true;
  }

  handleResponse(status: string, toNavigate: boolean) {
    this.isLoading = false;
    if (status) {
      this.handleSubmissionErrors(status);
      return;
    }
    if (toNavigate) {
      this.router.navigate([this.navigateTo]);
    }
    const messageSuffix: SnackBarSuffix = this.isEdit ? 'SAVE' : 'CREATE';
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: `APP.SNACK_BAR.SUCCESS.${messageSuffix}`,
      panelClass: ['snack-bar', 'snack-bar--success'],
    });
  }

  private handleSubmissionErrors(status: string) {
    this.errorMessage = status;
  }
}
