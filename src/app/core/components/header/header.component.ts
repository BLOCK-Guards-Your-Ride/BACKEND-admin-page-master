import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { defaultWarnDuartion, moduleNames } from '../../../shared/models/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  tokenExpireDate: number;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.tokenExpireDate = 0;
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.getUserInfo().subscribe(userInfo => {
      this.username = userInfo.username;
      this.tokenExpireDate = (new Date(userInfo.tokenExpireDate * 1000).getTime() - new Date().getTime()) / 1000;
    });
  }

  logout() {
    this.authService.logout()
      .subscribe((status) => {
        if (status) {
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: 'APP.SNACK_BAR.ERROR.LOGOUT',
            duration: defaultWarnDuartion,
            panelClass: ['snack-bar', 'snack-bar--warn'],
          });
        }
      });
  }

  gotoMainPage() {
    this.router.navigate([moduleNames.station]);
  }
}
