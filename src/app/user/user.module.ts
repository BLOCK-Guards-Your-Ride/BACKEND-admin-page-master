import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { ParkingSessionListComponent } from './components/parking-session-list/parking-session-list.component';
import { UserDataPanelComponent } from './pages/user-data-panel/user-data-panel.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ParkingSessionService } from './services/parking-session.service';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    ParkingSessionListComponent,
    UserDataPanelComponent,
    UserListComponent,
    UserFormComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    UserRoutingModule,
    ClipboardModule,
  ],
  providers: [UserService, ParkingSessionService],
})
export class UserModule {}
