import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ClientInformationRoutingModule } from './client-information-routing.module';
import { ClientInformationFormComponent } from './pages/client-information-form/client-information-form.component';
import { ClientInformationListComponent } from './pages/client-information-list/client-information-list.component';
import { ClientInformationService } from './services/client-information.service';

@NgModule({
  declarations: [
    ClientInformationListComponent,
    ClientInformationFormComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ClientInformationRoutingModule,
  ],
  providers: [ClientInformationService],
})
export class ClientInformationModule { }
