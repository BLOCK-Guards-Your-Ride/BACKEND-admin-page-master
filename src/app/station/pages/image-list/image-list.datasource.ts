import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from '../../../shared/classes/list.datasource';
import { StationAssetQueryRowType } from '../../../shared/models/image';
import { PaginationParamsType } from '../../../shared/models/request';
import { StationAssetQueryResponse } from '../../../shared/models/response';
import { StationImageOrdersType } from '../../../shared/models/sensor';
import { StationParamsType } from '../../../shared/models/station';
import { StationService } from '../../services/station.service';

export class ImageListDatasource extends ListDataSource<StationAssetQueryRowType> {

  stationImageDefaultOrderType: StationImageOrdersType = {
    field: 'CREATION_DATE',
    order: 'DESC',
  };

  constructor(private stationService: StationService, private stationId: string) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: StationImageOrdersType[] = [this.stationImageDefaultOrderType],
    params: StationParamsType[] = null,
    stationId: string = this.stationId) {
    super.getLoadingState().next(true);
    this.stationService.fetchStationAssets(stationId, paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: StationAssetQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
