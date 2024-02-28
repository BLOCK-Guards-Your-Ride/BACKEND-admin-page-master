import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersOfOrganizationListComponent } from './components/users-of-organization-list/users-of-organization-list.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationFormComponent } from './pages/organization-form/organization-form.component';
import { OrganizationListComponent } from './pages/organization-list/organization-list.component';
import { OrganizationViewComponent } from './pages/organization-view/organization-view.component';
import { OrganizationService } from './services/organization.service';



@NgModule({
  declarations: [
    OrganizationListComponent,
    OrganizationFormComponent,
    OrganizationViewComponent,
    UsersOfOrganizationListComponent,
    AddUserComponent,
  ],
  imports: [
    SharedModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [OrganizationService],
})
export class OrganizationModule { }
