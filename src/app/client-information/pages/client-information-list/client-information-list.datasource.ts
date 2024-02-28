import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import {
  ClientInformationOrdersType,
  ClientInformationParamsType,
  ClientInformationRowType,
} from '../../../shared/models/client-information';
import { PaginationParamsType } from '../../../shared/models/request';
import { ClientInformationService } from '../../services/client-information.service';
import { ClientInformationQueryResponse } from './../../../shared/models/response';

export class ClientInformationDataSource extends ListDataSource<ClientInformationRowType> {

  constructor(private clientInformationService: ClientInformationService) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: ClientInformationOrdersType[] = null,
    params: ClientInformationParamsType[] = null) {

    super.getLoadingState().next(true);
    this.clientInformationService.fetchClientInformations(paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: ClientInformationQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
