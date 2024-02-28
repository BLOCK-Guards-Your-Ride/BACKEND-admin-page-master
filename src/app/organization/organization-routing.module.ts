import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  Permission,
  routeNames,
} from '../shared/models/common';
import { PermissionGuard } from './../auth/guards/permission.guard';
import { OrganizationFormComponent } from './pages/organization-form/organization-form.component';
import { OrganizationListComponent } from './pages/organization-list/organization-list.component';
import { OrganizationViewComponent } from './pages/organization-view/organization-view.component';
import { OrganizationResolver } from './resolvers/organization.resolver';

const organizationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: OrganizationListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.ORGANIZATION_MANAGEMENT] },
  },
  {
    path: routeNames.new_organization,
    component: OrganizationFormComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.ORGANIZATION_MANAGEMENT] },
  },
  {
    path: ':orgId',
    component: OrganizationFormComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.ORGANIZATION_MANAGEMENT] },
    resolve: { resolved: OrganizationResolver },
  },
  {
    path: `:orgId/${routeNames.view}`,
    component: OrganizationViewComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.ORGANIZATION_MANAGEMENT] },
    resolve: { resolved: OrganizationResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(organizationRoutes)],
  exports: [RouterModule],
  providers: [PermissionGuard, OrganizationResolver],
})
export class OrganizationRoutingModule { }
