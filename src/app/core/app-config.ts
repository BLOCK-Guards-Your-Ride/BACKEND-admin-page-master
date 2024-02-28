import { MatSnackBarConfig } from '@angular/material/snack-bar';

import {
  defaultSuccessDuartion,
  MenuItem,
  moduleNames,
  Permission,
  routeNames,
} from '../shared/models/common';
import { AppConfig } from './tokens/app-config.token';

const menuItems: MenuItem[] = [
  {
    text: 'APP.MENU.BUTTON.STATION.TEXT',
    permissions: [Permission.LOGIN, Permission.STATION_MANAGEMENT],
    subMenus: [
      {
        text: 'APP.MENU.BUTTON.STATION.SUB_MENUS.NEW_STATION',
        href: `${moduleNames.station}/${routeNames.new_station}`,
      },
      {
        text: 'APP.MENU.BUTTON.STATION.SUB_MENUS.STATION_LIST',
        href: moduleNames.station,
      },
    ],
  },
  {
    text: 'APP.MENU.BUTTON.ORGANIZATION.TEXT',
    permissions: [Permission.LOGIN, Permission.ORGANIZATION_MANAGEMENT],
    subMenus: [
      {
        text: 'APP.MENU.BUTTON.ORGANIZATION.SUB_MENUS.NEW_ORGANIZATION',
        href: `${moduleNames.organization}/${routeNames.new_organization}`,
      },
      {
        text: 'APP.MENU.BUTTON.ORGANIZATION.SUB_MENUS.ORGANIZATION_LIST',
        href: moduleNames.organization,
      },
    ],
  },
  {
    text: 'APP.MENU.BUTTON.USER.TEXT',
    permissions: [Permission.LOGIN, Permission.USER_MANAGEMENT],
    subMenus: [
      {
        text: 'APP.MENU.BUTTON.USER.SUB_MENUS.NEW_ADMIN',
        href: `${moduleNames.user}/${routeNames.new_user}`,
      },
      {
        text: 'APP.MENU.BUTTON.USER.SUB_MENUS.USER_LIST',
        href: moduleNames.user,
      },
    ],
  },
  {
    text: 'APP.MENU.BUTTON.FEEDBACK_LIST',
    href: moduleNames.feedback,
    permissions: [Permission.LOGIN, Permission.FEEDBACK_MANAGEMENT],
  },
  {
    text: 'APP.MENU.BUTTON.CLIENT_INFORMATION.TEXT',
    permissions: [Permission.LOGIN, Permission.CLIENT_INFORMATION_MANAGEMENT],
    subMenus: [
      {
        text: 'APP.MENU.BUTTON.CLIENT_INFORMATION.SUB_MENUS.NEW_CLIENT_INFORMATION',
        href: `${moduleNames.client_information}/${routeNames.new_client_information}`,
      },
      {
        text: 'APP.MENU.BUTTON.CLIENT_INFORMATION.SUB_MENUS.CLIENT_INFORMATION_LIST',
        href: moduleNames.client_information,
      },
    ],
  },
];

const snackBarConfig: MatSnackBarConfig = {
  duration: defaultSuccessDuartion,
};

const appConfig: AppConfig = {
  menuItems,
  snackBarConfig,
};

export default appConfig;
