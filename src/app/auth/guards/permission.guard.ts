import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

import { defaultWarnDuartion, Permission } from 'src/app/shared/models/common';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private snackBar: MatSnackBar,
              private keycloakService: KeycloakService) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const userPermissions = this.keycloakService.getUserRoles();
    const neededPermissions: Permission[] = next.data.permissions;

    const canActivate = neededPermissions.every(perm => userPermissions.includes(perm));

    if (!canActivate) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: 'APP.SNACK_BAR.ERROR.NO_PERMISSION',
        duration: defaultWarnDuartion,
        panelClass: ['snack-bar', 'snack-bar--warn'],
      });
    }

    return canActivate;
  }

}
