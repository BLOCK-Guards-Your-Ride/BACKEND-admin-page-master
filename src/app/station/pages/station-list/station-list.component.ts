import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/classes/list.component';
import {
  moduleNames,
  routeNames,
} from '../../../shared/models/common';
import {
  defaultStationListState,
  StationStateType,
} from '../../../shared/models/station';
import { StationService } from '../../services/station.service';
import { ContextMenuElement } from './../../../shared/models/common';
import { StationDataSource } from './station.datasource';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss'],
})
export class StationListComponent extends ListComponent implements OnInit, AfterViewInit {

  public contextMenuElements: ContextMenuElement[];

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

  constructor(
    private stationService: StationService,
    private changeDetector: ChangeDetectorRef,
    public router: Router) {
    super(
      new StationDataSource(stationService),
      [
        'state',
        'station-qr-code',
        'name',
        'docks',
        'lat',
        'lng',
        'status',
        'edit',
      ],
      defaultStationListState,
      router,
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.contextMenuElements = [
      {
        icon: 'edit',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.EDIT',
        action: this.editStation.bind(this),
      },
      {
        icon: 'settings_ethernet',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.STATION_CONNECTION_DATA',
        action: this.editStationConnectionData.bind(this),
      },
      {
        icon: 'build',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.PLC_METADATA',
        action: this.editPlcMetadata.bind(this),
      },
      {
        icon: 'storage',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.DOCK_LIST',
        action: this.listDocks.bind(this),
      },
      {
        icon: 'image',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.IMAGE_LIST',
        action: this.listImages.bind(this),
      },
      {
        icon: 'sensors',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.SENSOR_LIST',
        action: this.listSensors.bind(this),
      },
      {
        icon: 'analytics',
        text: 'APP.STATION_LIST.TABLE.COLUMNS.EDIT_MENU.METRIC_LIST',
        action: this.listMetricsData.bind(this),
      },
    ];
  }

  editStation(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId]);
  }

  editPlcMetadata(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId, routeNames.plc_metadata]);
  }

  editStationConnectionData(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId, routeNames.connection_data]);
  }

  listDocks(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId, routeNames.dock_list]);
  }

  listSensors(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId, routeNames.sensor_list]);
  }

  listImages(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId, routeNames.image_list]);
  }

  listMetricsData(stationId: string) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.station, stationId, routeNames.metrics_list]);
  }

  setStationState(stationId: string, state: StationStateType) {
    this.loading$ = of(true);
    this.stationService.setStationState(stationId, state).pipe(
      tap(() => {
        this.fetchData();
        this.loading$ = of(false);
      }),
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.paginator.pageIndex = this.listState.paginationParams.page;
    this.paginator.pageSize = this.listState.paginationParams.rows;
    this.changeDetector.detectChanges();
  }

}
