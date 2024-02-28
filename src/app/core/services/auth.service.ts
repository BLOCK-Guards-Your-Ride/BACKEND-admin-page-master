import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

import { Observable, of } from 'rxjs';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { defaultWarnDuartion, Permission } from '../../shared/models/common';
import { UserInfo } from '../../shared/models/user-info';
import { BaseService } from './base.service';

@Injectable()
export class AuthService extends BaseService {

  constructor(injector: Injector,
              private keycloakService: KeycloakService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super(null, injector);
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable((observable) => {
      this.keycloakService.isLoggedIn().then(loggedIn => {
        observable.next(loggedIn);
      });
    });
  }

  getUserInfo(): Observable<UserInfo> {
    return new Observable<UserInfo>(observable => {
      this.keycloakService.loadUserProfile(true).then(userProfile => {
        const tokenExpired = this.keycloakService.getKeycloakInstance().tokenParsed.exp;
        observable.next(new UserInfo(userProfile.username, tokenExpired));
      });
    });
  }

  getPermissions(): Observable<Permission[]> {
    return new Observable((observable) => {
      this.isLoggedIn().subscribe(loggedIn => {
        const permissions = [];
        if (loggedIn) {
          permissions.push(Permission.LOGIN);
          this.setCurrentUserPermissions(permissions);
        } else {
          permissions.push(Permission.ANONYMUS);
        }
        observable.next(permissions);
      });
    });
  }

  logout(): Observable<string | void> {
    return new Observable<string | void>(() => {
      this.keycloakService.logout('')
        .catch((error: HttpErrorResponse) => of(this.commonService.handleErrors(error.status)));
    });
  }

  handleUnauthorizedError(errorCode: number) {
    if (errorCode === 401) {
      this.router.navigate(['']);
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: 'APP.SNACK_BAR.ERROR.UNAUTHORIZED',
        panelClass: ['snack-bar', 'snack-bar--warn'],
        duration: defaultWarnDuartion,
      });
    }
  }

  private setCurrentUserPermissions(permissions: Permission[]) {
    this.keycloakService.getUserRoles().forEach(role => {
      const permission = Permission[role];
      if (permission) {
        permissions.push(Permission[permission]);
      }
    });
  }

}
