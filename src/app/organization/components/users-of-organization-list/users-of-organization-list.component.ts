import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/classes/list.component';
import { BaseDialogComponent } from 'src/app/shared/components/base-dialog/base-dialog.component';
import { defaultListState } from 'src/app/shared/models/common';
import { OrganizationService } from '../../services/organization.service';
import { UsersOfOrganizationDataSource } from './users-of-organization.datasource';

@Component({
  selector: 'app-users-of-organization-list',
  templateUrl: './users-of-organization-list.component.html',
  styleUrls: ['./users-of-organization-list.component.scss'],
})
export class UsersOfOrganizationListComponent extends ListComponent implements OnInit, OnDestroy {

  private listActionsSubscription: Subscription;

  constructor(
    private dialogService: MatDialog,
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService, public router: Router) {
    super(
      new UsersOfOrganizationDataSource(organizationService, activatedRoute.snapshot.params.orgId),
      [
        'name',
        'email',
        'remove',
      ],
      defaultListState,
      router,
    )
  }

  ngOnInit() {
    super.ngOnInit();
    this.listActionsSubscription = this.organizationService.getUsersOfOrganizationListActionsListener().pipe(
      tap(() => this.fetchData()),
    ).subscribe();
  }

  ngOnDestroy() {
    this.listActionsSubscription.unsubscribe();
  }

  onRemoveUser(userId: number) {
    this.dialogService.open(BaseDialogComponent, {
      data: {
        title: 'APP.ORGANIZATION.COMPONENTS.USERS_OF_ORGANIZATION_LIST.TABLE.ACTIONS.REMOVE.TITLE',
        body: 'APP.ORGANIZATION.COMPONENTS.USERS_OF_ORGANIZATION_LIST.TABLE.ACTIONS.REMOVE.BODY',
        actions: [{
          label: 'APP.ORGANIZATION.COMPONENTS.USERS_OF_ORGANIZATION_LIST.TABLE.ACTIONS.REMOVE.OK',
          color: 'accent',
          data: true,
        }],
      },
    })
    .afterClosed()
    .pipe(
      filter(a => !!a),
      switchMap(() => {
        return this.organizationService.removeUserFromOrganization(this.activatedRoute.snapshot.params.orgId, userId);
      }),
    ).subscribe();

  }

}
