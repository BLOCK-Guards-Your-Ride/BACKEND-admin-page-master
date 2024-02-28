import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import {
  OrganizationOrdersType,
  OrganizationParamsType,
  OrganizationRowType,
} from 'src/app/shared/models/organization';
import { PaginationParamsType } from 'src/app/shared/models/request';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationQueryResponse } from './../../../shared/models/response';

export class OrganizationDataSource extends ListDataSource<OrganizationRowType> {


  constructor(private organizationService: OrganizationService) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: OrganizationOrdersType[] = null,
    params: OrganizationParamsType[] = null) {
    super.getLoadingState().next(true);
    this.organizationService.fetchOrganizations(paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: OrganizationQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
