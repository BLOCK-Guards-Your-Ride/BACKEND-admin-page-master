import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { ListComponent } from 'src/app/shared/classes/list.component';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { UserService } from '../../services/user.service';
import { moduleNames, routeNames } from './../../../shared/models/common';
import { defaultUserListState } from './../../../shared/models/user';
import { UserDataSource } from './user.datasource';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends ListComponent {

  constructor(
    public router: Router,
    private snackBar: MatSnackBar,
    userService: UserService) {
    super(
      new UserDataSource(userService),
      [
        'id',
        'name',
        'email',
        'phone-number',
        'details',
      ],
      defaultUserListState,
      router,

    );
  }

  checkParkingSession(userId: number) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.user, userId, routeNames.view]);
  }

  snackBarMessage() {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: `APP.SNACK_BAR.SUCCESS.COPY`,
      panelClass: ['snack-bar', 'snack-bar--success'],
    });
  }
}
