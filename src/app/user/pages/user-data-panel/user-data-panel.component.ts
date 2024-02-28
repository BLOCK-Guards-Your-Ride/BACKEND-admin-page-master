import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { moduleNames } from './../../../shared/models/common';
import { UserInfoType } from './../../../shared/models/user';

@Component({
  selector: 'app-user-data-panel',
  templateUrl: './user-data-panel.component.html',
  styleUrls: ['./user-data-panel.component.scss'],
})
export class UserDataPanelComponent {

  public user: UserInfoType;
  public backRoute: string;

  constructor(activatedRoute: ActivatedRoute) {
    this.user = activatedRoute.snapshot.data.user;
    this.backRoute = moduleNames.user;
  }

}
