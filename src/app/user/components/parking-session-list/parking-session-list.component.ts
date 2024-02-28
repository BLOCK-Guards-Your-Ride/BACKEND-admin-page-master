import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';

import { of } from 'rxjs';
import {
  switchMap,
  tap,
} from 'rxjs/operators';
import { ListComponent } from 'src/app/shared/classes/list.component';
import { DockOperationDialogComponent }
  from 'src/app/shared/components/dialogs/dock-operation-dialog/dock-operation-dialog.component';
import { ParkingSessionService } from '../../services/parking-session.service';
import { DockOperationType } from './../../../shared/models/dock';
import { defaultParkingSessionListState } from './../../../shared/models/parking-session';
import { DockResponse } from './../../../shared/models/response';
import { ParkingSessionDataSource } from './parking-session.datasource';

@Component({
  selector: 'app-parking-session-list',
  templateUrl: './parking-session-list.component.html',
  styleUrls: ['./parking-session-list.component.scss'],
})
export class ParkingSessionListComponent extends ListComponent implements OnInit {

  @Input() userId: string;

  public now: Date;
  public errorMessage: string;

  constructor(
    private dialogService: MatDialog,
    private parkingSessionService: ParkingSessionService, public router: Router) {

    super(
      new ParkingSessionDataSource(parkingSessionService),
      [
        'status',
        'station-name',
        'dock-nr',
        'parking-start-time',
        'parking-stop-time',
        'price',
        'stop',
      ],
      defaultParkingSessionListState,
      router,
    );
    this.now = new Date();
  }

  ngOnInit() {
    this.listState.params.push({
      field: 'USER_ID',
      value: this.userId,
    });
    super.ngOnInit();
  }

  isParkingSessionActive(start: Date, stop: Date) {
    if (stop) {
      return start <= new Date() && stop >= new Date();
    }
    return true;
  }

  stopParking(stationId: number, dockNr: number) {
    this.dialogService.open(DockOperationDialogComponent, { data: false })
      .afterClosed()
      .pipe(
        switchMap((operation: DockOperationType) => {
          if (operation) {
            return this.parkingSessionService.stopParkingSession(stationId, dockNr, { operation });
          }
          return of('');
        }),
        tap((response: DockResponse) => {
          if (response.dock) {
            this.fetchData();
          } else {
            this.errorMessage = response.toString();
          }
        }),
      )
      .subscribe();
  }

}
