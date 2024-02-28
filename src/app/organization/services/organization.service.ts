import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import {
  OptionalOrganizationType,
  OrganizationOrdersType,
  OrganizationParamsType,
  OrganizationType,
} from 'src/app/shared/models/organization';
import { PaginationParamsType } from 'src/app/shared/models/request';
import { BaseResponse, OrganizationQueryResponse, OrganizationResponse, UserListResponse } from './../../shared/models/response';

@Injectable()
export class OrganizationService extends BaseService {

  private usersOfOrganizationLisActionListener: Subject<null>;

  constructor(
    private authService: AuthService,
    injector: Injector) {
    super('organizations', injector);
    this.usersOfOrganizationLisActionListener = new Subject();
  }

  fetchOrganizations(
    paginationParams: PaginationParamsType,
    orders: OrganizationOrdersType[],
    params: OrganizationParamsType[]): Observable<OrganizationQueryResponse> {

    return this.httpClient.post<OrganizationQueryResponse>(`${this.urlPrefix}/query`, this.commonService.createRequest({
      orders,
      paginationParams,
      params,
    }));
  }

  fetchUsersOfOrganization(organizationId: number): Observable<UserListResponse> {
    return this.httpClient.get<UserListResponse>(`${this.urlPrefix}/${organizationId}/users`);
  }

  getOrganization(organizationId: number): Observable<OrganizationResponse> {
    return this.httpClient.get<OrganizationResponse>(`${this.urlPrefix}/${organizationId}`).pipe(
      catchError(this.handleError),
    );
  }

  createOrganization(organization: OrganizationType): Observable<string> {
    return this.httpClient.post<OrganizationResponse>(`${this.urlPrefix}`, this.commonService.createRequest({
      organization,
    })).pipe(
      mapTo(null),
      catchError(this.handleError),
    );
  }

  editOrganization(organization: OptionalOrganizationType, orgId: number): Observable<string> {
    return this.httpClient.put<OrganizationResponse>(`${this.urlPrefix}/${orgId}`, this.commonService.createRequest({
      organization,
    })).pipe(
      mapTo(null),
      catchError(this.handleError),
    );
  }

  removeUserFromOrganization(orgId: number, userId: number): Observable<string> {
    return this.httpClient.delete<BaseResponse>(`${this.urlPrefix}/${orgId}/users/${userId}`).pipe(
      tap(() => this.usersOfOrganizationLisActionListener.next()),
      mapTo(null),
      catchError(this.handleError),
    );
  }

  adduserToOrganization(organizationId: number, userId: number) {
    return this.httpClient.post<BaseResponse>(`${this.urlPrefix}/${organizationId}/users/${userId}`, {}).pipe(
      tap(() => this.usersOfOrganizationLisActionListener.next()),
      mapTo(null),
      catchError(this.handleError),
    )
  }

  getUsersOfOrganizationListActionsListener(): Observable<null> {
    return this.usersOfOrganizationLisActionListener.asObservable();
  }

  private handleError = (error: HttpErrorResponse): Observable<any> => {
    return of(this.commonService.handleErrors(
      error.status,
      this.authService.handleUnauthorizedError.bind(this.authService),
    ));
  }
}
