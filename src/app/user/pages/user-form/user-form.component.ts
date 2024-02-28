import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { omit } from 'lodash';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { moduleNames } from 'src/app/shared/models/common';
import { UserService } from '../../services/user.service';
import { GenderType, SecurityGroup, UserWithSecurityGroupType } from './../../../shared/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {

  public genders: GenderType[];
  public securityGroups: SecurityGroup[];
  public errorMessage: string;
  public isLoading: boolean;

  organizationId: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService) {
    this.genders = [
      'FEMALE',
      'MALE',
      'OTHER',
    ];
    this.securityGroups = [
      'ADMIN',
      'PREMIUM',
      'STATION_ADMIN',
      'USER',
    ];
    this.isLoading = false;
  }

  createAdmin(form: NgForm) {
    if (form.valid) {
      this.prepareForAsync();
      this.userService.createAdmin(this.prepareAdminRequest(form.value))
        .subscribe((status: string) => this.handleResponse(status));
    }
  }

  fetchOrganization(value: string) {
    return this.userService.fetchOrganizationsForAutcomplete(value);
  }

  private prepareForAsync() {
    this.errorMessage = null;
    this.isLoading = true;
  }

  private handleSubmissionErrors(status: string) {
    this.errorMessage = status;
  }

  private handleResponse(status: string) {
    this.isLoading = false;
    if (status) {
      this.handleSubmissionErrors(status);
      return;
    }
    this.router.navigate([moduleNames.user]);
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: 'APP.SNACK_BAR.SUCCESS.ADMIN.CREATE',
      panelClass: ['snack-bar', 'snack-bar--success'],
    });
  }

  private prepareAdminRequest(user: any): UserWithSecurityGroupType {
    return {
      ...omit(user, ['password', 'passwordAgain']),
      password: user.password,
      privacyPolicyAccepcted: true,
    } as any;
  }
}
