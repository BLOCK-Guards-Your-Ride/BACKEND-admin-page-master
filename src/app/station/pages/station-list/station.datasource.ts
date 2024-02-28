import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from '../../../shared/classes/list.datasource';
import { PaginationParamsType } from '../../../shared/models/request';
import {
  CoordinateParamsType,
  StationOrdersType,
  StationParamsType,
  StationQueryRowType,
} from '../../../shared/models/station';
import { StationService } from '../../services/station.service';
import { StationQueryResponse } from './../../../shared/models/response';

export class StationDataSource extends ListDataSource<StationQueryRowType> {

  constructor(private stationService: StationService) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: StationOrdersType[] = null,
    params: StationParamsType[] = null,
    coordinateParams: CoordinateParamsType = null) {

    this.getLoadingState().next(true);
    this.stationService.fetchStations(paginationParams, orders, params, coordinateParams)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: StationQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
