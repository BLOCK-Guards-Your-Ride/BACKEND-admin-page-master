import { Component, Inject, OnInit } from '@angular/core';

import { difference } from 'lodash';
import { MenuItem, Permission } from '../../../shared/models/common';
import { AuthService } from '../../services/auth.service';
import { APP_CONFIG, AppConfig } from '../../tokens/app-config.token';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public menuItems: MenuItem[];

  private userPermissions: Permission[];

  constructor(@Inject(APP_CONFIG) appConfig: AppConfig, private authService: AuthService) {
    this.menuItems = appConfig.menuItems;
  }

  ngOnInit() {
    this.authService.getPermissions().subscribe(userPermissions => {
      this.userPermissions = userPermissions;
    });
  }

  hasPermissions(permissions: Permission[]): boolean {
    return difference(permissions, this.userPermissions).length === 0;
  }
}
