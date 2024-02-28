import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import { UserQueryResponse } from 'src/app/shared/models/response';
import { UserService } from '../../services/user.service';
import { PaginationParamsType } from './../../../shared/models/request';
import {
  UserOrdersType,
  UserParamsType,
  UserRowType,
} from './../../../shared/models/user';

export class UserDataSource extends ListDataSource<UserRowType> {

  constructor(private userService: UserService) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: UserOrdersType[] = null,
    params: UserParamsType[] = null) {
    super.getLoadingState().next(true);
    this.userService.fetchUsers(paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: UserQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
