import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/classes/list.component';
import { DockOperationDialogComponent } from 'src/app/shared/components/dialogs/dock-operation-dialog/dock-operation-dialog.component';
import {
  defaultStationDockListState,
  DockOperationType,
} from '../../../shared/models/dock';
import { DockResponse } from '../../../shared/models/response';
import { StationService } from '../../services/station.service';
import { StationDockDataSource } from './dock-list.datasource';

@Component({
  selector: 'app-dock-list',
  templateUrl: './dock-list.component.html',
  styleUrls: ['./dock-list.component.scss'],
})
export class DockListComponent extends ListComponent implements OnInit {

  public backRoute: string;
  private stationId: string;
  public errorMessage: string;

  constructor(
    private dialogService: MatDialog,
    private activatedRoute: ActivatedRoute,
    private stationService: StationService,
    public router: Router) {
    super(
      new StationDockDataSource(stationService, activatedRoute.snapshot.params.stationId),
      [
        'dock-nr',
        'bolt-locked',
        'enabled',
        `last-open-state`,
        'occupied',
        'operation',
      ],
      defaultStationDockListState,
      router,

    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.stationId = this.activatedRoute.snapshot.params.stationId;
  }

  openDock(dockNr: number) {
    this.dialogService.open(DockOperationDialogComponent, { data: true })
      .afterClosed()
      .pipe(
        switchMap((operation: DockOperationType) => {
          if (operation) {
            this.dataSource.getLoadingState().next(true);
            return this.stationService.stopParkingSession(this.stationId, dockNr, { operation });
          }
          return of('');
        }),
        tap((response: DockResponse) => {
          if (response.dock) {
            this.fetchData();
          } else {
            this.dataSource.getLoadingState().next(false);
            this.errorMessage = response.toString();
          }
        }),
      )
      .subscribe();
  }

}
