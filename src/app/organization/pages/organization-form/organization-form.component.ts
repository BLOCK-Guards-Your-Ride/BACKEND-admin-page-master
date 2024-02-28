import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { BaseFormDirective } from 'src/app/shared/classes/base-form.directive';
import {
  OrganizationInfoType,
  organizationTypes,
  OrganizationTypeType,
} from 'src/app/shared/models/organization';
import { OrganizationService } from '../../services/organization.service';
import { moduleNames } from './../../../shared/models/common';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent extends BaseFormDirective<OrganizationInfoType> implements OnInit {

  orgTypes: OrganizationTypeType[];

  constructor(
    router: Router,
    snackBar: MatSnackBar,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private organizationService: OrganizationService) {
      super(
        moduleNames.organization,
        router,
        snackBar,
        activatedRoute);
    }
  ngOnInit(): void {
    super.ngOnInit();
    this.orgTypes = organizationTypes;
    this.formGroup = this.formBuilder.group({
      name: [this.formInfo.name, [Validators.required, Validators.maxLength(255)]],
      orgType: [this.formInfo.orgType, [Validators.required]],
      enabled: [this.formInfo.enabled],
    })
    this.backRoute = moduleNames.organization;
    this.backText = 'APP.BACK_BUTTON.BACK_TO_ORGANIZATION_LIST';
  }

  get name(): AbstractControl {
    return this.formGroup.get('name');
  }

  get type(): AbstractControl {
    return this.formGroup.get('orgType');
  }

  onSave(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.prepareForAsync();
    this.organizationService.editOrganization(this.formGroup.value, this.formInfo.id).pipe(
      tap((status) => this.handleResponse(status, false)),
    ).subscribe();
  }

  onCreate(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.prepareForAsync();
    this.organizationService.createOrganization(this.formGroup.value).pipe(
      tap((status: string) => this.handleResponse(status, true)),
    ).subscribe();
  }
  onSaveAndExit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.prepareForAsync();
    this.organizationService.editOrganization(this.formGroup.value, this.formInfo.id).pipe(
      tap((status) => this.handleResponse(status, true)),
    ).subscribe();
  }

}
