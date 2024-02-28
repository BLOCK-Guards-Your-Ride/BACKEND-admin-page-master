import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import { UserRowType } from 'src/app/shared/models/user';
import { OrganizationService } from '../../services/organization.service';
import { UserListResponse } from './../../../shared/models/response';

export class UsersOfOrganizationDataSource extends ListDataSource<UserRowType> {


  constructor(private organizationService: OrganizationService,
    private organizationId: number) {
    super();
  }

  fetch() {
    super.getLoadingState().next(true);
    this.organizationService.fetchUsersOfOrganization(this.organizationId)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: UserListResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.list.rows && response.list.rows.length);
      });
  }
}
