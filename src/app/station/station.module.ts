import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from 'src/app/shared/shared.module';
import { DockItemComponent } from './components/dock-item/dock-item.component';
import { DockListFormComponent } from './components/dock-list-form/dock-list-form.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { TariffFormComponent } from './components/tariff-list/tariff-form/tariff-form.component';
import { TariffListComponent } from './components/tariff-list/tariff-list.component';
import { DockListComponent } from './pages/dock-list/dock-list.component';
import { ImageListComponent } from './pages/image-list/image-list.component';
import { MetricsListComponent } from './pages/metrics-list/metrics-list.component';
import { PlcMetadataFormComponent } from './pages/plc-metadata-form/plc-metadata-form.component';
import { SensorListComponent } from './pages/sensor-list/sensor-list.component';
import { StationConnectionDataFormComponent } from './pages/station-connection-data-form/station-connection-data-form.component';
import { StationFormComponent } from './pages/station-form/station-form.component';
import { StationListComponent } from './pages/station-list/station-list.component';
import { StationService } from './services/station.service';
import { StationRoutingModule } from './station-routing.module';

@NgModule({
  declarations: [
    DockListFormComponent,
    DockItemComponent,
    PlcMetadataFormComponent,
    StationConnectionDataFormComponent,
    StationListComponent,
    StationFormComponent,
    DockListComponent,
    GoogleMapComponent,
    SensorListComponent,
    ImageListComponent,
    MetricsListComponent,
    TariffListComponent,
    TariffFormComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StationRoutingModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [StationService],
})
export class StationModule {}
