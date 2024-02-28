import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListComponent } from 'src/app/shared/classes/list.component';
import {
  defaultOrganiationListState,
  organizationTypes,
  OrganizationTypeType,
} from 'src/app/shared/models/organization';
import { OrganizationService } from '../../services/organization.service';
import { moduleNames, routeNames } from './../../../shared/models/common';
import { OrganizationDataSource } from './organization.datasource';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent extends ListComponent implements OnInit {

  orgTypes: OrganizationTypeType[];

  constructor(
    organizationService: OrganizationService,
    public router: Router) {
    super(
      new OrganizationDataSource(organizationService),
      [
        'enabled',
        'name',
        'slug',
        'org-type',
        'edit',
      ],
      defaultOrganiationListState,
      router,
    )
  }

  ngOnInit() {
    super.ngOnInit();
    this.orgTypes = organizationTypes;
  }

  onEdit(orgId: number) {
    this.router.navigate([moduleNames.organization, orgId]);
  }

  onView(orgId: number) {
    this.router.navigate([moduleNames.organization, orgId, routeNames.view]);
  }

}
