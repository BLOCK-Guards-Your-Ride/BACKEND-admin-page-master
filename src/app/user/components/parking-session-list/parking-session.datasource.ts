import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import {
  ParkingSessionOrdersType,
  ParkingSessionParamsType,
  ParkingSessionRowType,
} from './../../../shared/models/parking-session';
import { PaginationParamsType } from './../../../shared/models/request';
import { ParkingSessionQueryResponse } from './../../../shared/models/response';
import { ParkingSessionService } from './../../services/parking-session.service';

export class ParkingSessionDataSource extends ListDataSource<ParkingSessionRowType> {

  constructor(private parkingSessionService: ParkingSessionService) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: ParkingSessionOrdersType[] = null,
    params: ParkingSessionParamsType[] = null): void {

    super.getLoadingState().next(true);
    this.parkingSessionService.fetchParkingSessions(paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: ParkingSessionQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
