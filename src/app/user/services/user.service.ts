import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  mapTo,
} from 'rxjs/operators';
import { OrganizationParamsType } from 'src/app/shared/models/organization';
import { AuthService } from '../../core/services/auth.service';
import { BaseService } from '../../core/services/base.service';
import { AutocompleteData, defaultPaginationParams } from '../../shared/models/common';
import { PaginationParamsType } from '../../shared/models/request';
import {
  OrganizationQueryResponse,
  UserQueryResponse,
  UserResponse,
} from '../../shared/models/response';
import {
  UserOrdersType,
  UserParamsType,
  UserWithSecurityGroupType,
} from '../../shared/models/user';

@Injectable()
export class UserService extends BaseService {

  constructor(
    injector: Injector,
    private authService: AuthService) {
    super('users', injector);
  }

  fetchUsers(
    paginationParams: PaginationParamsType,
    orders: UserOrdersType[],
    params: UserParamsType[]): Observable<UserQueryResponse> {

    return this.httpClient.post<UserQueryResponse>(`${this.urlPrefix}/query`, this.commonService.createRequest({
      orders,
      paginationParams,
      params,
    }));
  }

  getUser(userId: number) {
    return this.httpClient.get<UserResponse>(`${this.urlPrefix}/${userId}`).pipe(
      map(response => response.user),
    );
  }

  createAdmin(user: UserWithSecurityGroupType) {
    return this.httpClient.post<UserResponse>(`${this.urlPrefix}`, this.commonService.createRequest({ user })).pipe(
      mapTo(null),
      catchError(this.handleError),
    );
  }

  fetchOrganizationsForAutcomplete(value: string): Observable<AutocompleteData[]> {
    const params: OrganizationParamsType[] = value
      ? [
          {
            value,
            field: 'NAME',
          },
        ]
      : undefined;
    return this.httpClient.post<OrganizationQueryResponse>(`organizations/query`, this.commonService.createRequest({
      paginationParams: defaultPaginationParams,
      params,
      orders: [
        {
          field: 'NAME',
          order: 'ASC',
        },
      ],
    })).pipe(
      map((response) => response.list.rows.map((org) => {
          return {
            label: org.name,
            value: org.id,
          };
        }),
      ),
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<any> => {
    return of(this.commonService.handleErrors(
      error.status,
      this.authService.handleUnauthorizedError.bind(this.authService),
      { 422: 'EMAIL_ALREADY_EXISTS' },
    ));
  }

}
