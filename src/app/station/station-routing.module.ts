import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PermissionGuard } from '../auth/guards/permission.guard';
import { Permission, routeNames } from '../shared/models/common';
import { DockListComponent } from './pages/dock-list/dock-list.component';
import { ImageListComponent } from './pages/image-list/image-list.component';
import { MetricsListComponent } from './pages/metrics-list/metrics-list.component';
import { PlcMetadataFormComponent } from './pages/plc-metadata-form/plc-metadata-form.component';
import { SensorListComponent } from './pages/sensor-list/sensor-list.component';
import { StationConnectionDataFormComponent } from './pages/station-connection-data-form/station-connection-data-form.component';
import { StationFormComponent } from './pages/station-form/station-form.component';
import { StationListComponent } from './pages/station-list/station-list.component';
import { PLCMetadataResolver } from './resolver/plc-metadata.resolver';
import { StationConnectionDataResolver } from './resolver/station-connection-data.resolver';
import { StationResolver } from './resolver/station.resolver';

const stationRoutes: Routes = [
  {
    path: '',
    component: StationListComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.STATION_QUERY] },
  },
  {
    path: routeNames.new_station,
    component: StationFormComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.STATION_MANAGEMENT] },
  },
  {
    path: ':stationId',
    component: StationFormComponent,
    resolve: { station: StationResolver },
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.STATION_MANAGEMENT] },
  },
  {
    path: `:stationId/${routeNames.plc_metadata}`,
    component: PlcMetadataFormComponent,
    resolve: { plcMetadata: PLCMetadataResolver },
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.PLC_METADATA_MANAGEMENT] },
  },
  {
    path: `:stationId/${routeNames.connection_data}`,
    component: StationConnectionDataFormComponent,
    resolve: { connectionMetadata: StationConnectionDataResolver },
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.CONNECTION_METADATA_MANAGEMENT] },
  },
  {
    path: `:stationId/${routeNames.dock_list}`,
    component: DockListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.DOCK_MANAGEMENT] },
  },
  {
    path: `:stationId/${routeNames.sensor_list}`,
    component: SensorListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.STATION_MANAGEMENT] },
  },
  {
    path: `:stationId/${routeNames.image_list}`,
    component: ImageListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.STATION_MANAGEMENT] },
  },
  {
    path: `:stationId/${routeNames.metrics_list}`,
    component: MetricsListComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.STATION_MANAGEMENT] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(stationRoutes)],
  exports: [RouterModule],
  providers: [
    StationResolver,
    PLCMetadataResolver,
    StationConnectionDataResolver,
    PermissionGuard,
  ],
})
export class StationRoutingModule {}
