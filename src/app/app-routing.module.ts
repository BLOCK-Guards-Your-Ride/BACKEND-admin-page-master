import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from './auth/guards/login.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { moduleNames } from './shared/models/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${moduleNames.station}`,
    pathMatch: 'full',
  },
  {
    path: moduleNames.auth,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: moduleNames.user,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [LoginGuard],
  },
  {
    path: moduleNames.station,
    loadChildren: () => import('./station/station.module').then(m => m.StationModule),
    canActivate: [LoginGuard],
  },
  {
    path: moduleNames.feedback,
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule),
    canActivate: [LoginGuard],
  },
  {
    path: moduleNames.client_information,
    loadChildren: () => import('./client-information/client-information.module').then(m => m.ClientInformationModule),
    canActivate: [LoginGuard],
  },
  {
    path: moduleNames.organization,
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard],
})
export class AppRoutingModule {}
