import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { PermissionGuard } from '../auth/guards/permission.guard';
import {
  Permission,
  routeNames,
} from '../shared/models/common';
import { ClientInformationFormComponent } from './pages/client-information-form/client-information-form.component';
import { ClientInformationListComponent } from './pages/client-information-list/client-information-list.component';
import { ClientInformationResolver } from './resolvers/client-information.resolver';

const clientInformationRoutes: Routes = [
  {
    path: '',
    component: ClientInformationListComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.CLIENT_INFORMATION_MANAGEMENT] },
  },
  {
    path: routeNames.new_client_information,
    component: ClientInformationFormComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.CLIENT_INFORMATION_MANAGEMENT] },
  },
  {
    path: ':clientInformationId',
    component: ClientInformationFormComponent,
    resolve: { clientInformation: ClientInformationResolver },
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.CLIENT_INFORMATION_MANAGEMENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(clientInformationRoutes)],
  exports: [RouterModule],
  providers: [ClientInformationResolver, PermissionGuard],
})
export class ClientInformationRoutingModule { }
