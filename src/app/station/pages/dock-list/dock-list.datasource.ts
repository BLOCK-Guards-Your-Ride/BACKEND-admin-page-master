import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from '../../../shared/classes/list.datasource';
import {
  StationDockOrdersType,
  StationDockParamsType,
  StationDockQueryRowType,
} from '../../../shared/models/dock';
import { PaginationParamsType } from '../../../shared/models/request';
import { StationService } from '../../services/station.service';
import { StationDockQueryResponse } from './../../../shared/models/response';

export class StationDockDataSource extends ListDataSource<StationDockQueryRowType> {

  constructor(private stationService: StationService, private stationId: string) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: StationDockOrdersType[] = null,
    params: StationDockParamsType[] = null,
    stationId: string = this.stationId) {

    super.getLoadingState().next(true);
    this.stationService.fetchStationDocks(stationId, paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: StationDockQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
