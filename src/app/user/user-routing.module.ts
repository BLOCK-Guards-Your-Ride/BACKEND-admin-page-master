import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { routeNames } from '../shared/models/common';
import { PermissionGuard } from './../auth/guards/permission.guard';
import { Permission } from './../shared/models/common';
import { UserDataPanelComponent } from './pages/user-data-panel/user-data-panel.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserResolver } from './resolvers/user.resolver';

const userRoutes: Routes = [
  {
    path: '',
    component: UserListComponent,
    pathMatch: 'full',
    data: { permissions: [Permission.USER_MANAGEMENT] },
    canActivate: [PermissionGuard],
  },
  {
    path: routeNames.new_user,
    component: UserFormComponent,
    data: { permissions: [Permission.USER_MANAGEMENT] },
    canActivate: [PermissionGuard],
  },
  {
    path: `:userId/${routeNames.view}`,
    component: UserDataPanelComponent,
    resolve: { user: UserResolver },
    data: { permissions: [Permission.USER_MANAGEMENT] },
    canActivate: [PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
  providers: [UserResolver, PermissionGuard],
})
export class UserRoutingModule { }
