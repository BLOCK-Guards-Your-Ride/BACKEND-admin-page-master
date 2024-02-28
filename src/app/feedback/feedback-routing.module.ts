import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission } from '../shared/models/common';
import { FeedbackListComponent } from './pages/feedback-list/feedback-list.component';

const feedbackRoutes: Routes = [
  {
    path: '',
    component: FeedbackListComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.FEEDBACK_MANAGEMENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(feedbackRoutes)],
  exports: [RouterModule],
  providers: [PermissionGuard],
})
export class FeedbackRoutingModule { }
