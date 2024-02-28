import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
  catchError,
  mapTo,
} from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { BaseService } from '../../core/services/base.service';
import {
  ClientInformationInfoType,
  ClientInformationOrdersType,
  ClientInformationParamsType,
  ClientInformationType,
} from '../../shared/models/client-information';
import { PaginationParamsType } from '../../shared/models/request';
import { ClientInformationQueryResponse, ClientInformationResponse } from '../../shared/models/response';

@Injectable()
export class ClientInformationService extends BaseService {

  constructor(
    private authService: AuthService,
    injector: Injector) {
    super('clientInformation', injector);
  }

  fetchClientInformations(
    paginationParams: PaginationParamsType,
    orders: ClientInformationOrdersType[],
    params: ClientInformationParamsType[]): Observable<ClientInformationQueryResponse> {

    return this.httpClient.post<ClientInformationQueryResponse>(
      `${this.urlPrefix}/query`,
      this.commonService.createRequest({
        orders,
        paginationParams,
        params,
      }));
  }

  createClientInformation(clientInformation: ClientInformationType) {
    return this.httpClient.post<ClientInformationResponse>(
      `${this.urlPrefix}`, this.commonService.createRequest({ clientInformation })).pipe(
        mapTo(null),
        catchError(this.handleError),
      );
  }

  getClientInformations(clientInformationId: string): Observable<ClientInformationResponse> {
    return this.httpClient.get<ClientInformationResponse>(`${this.urlPrefix}/${clientInformationId}`).pipe(
      catchError(this.handleError),
    );
  }

  editClientInformation(clientInformationId: string, clientInformation: ClientInformationInfoType): Observable<string> {
    return this.httpClient.put<ClientInformationResponse>(
      `${this.urlPrefix}/${clientInformationId}`, this.commonService.createRequest({
        clientInformation,
      })).pipe(
        mapTo(null),
        catchError((error: HttpErrorResponse) =>
          of(this.commonService.handleErrors(
            error.status,
            this.authService.handleUnauthorizedError.bind(this.authService),
          ))),
      );
  }

  private handleError = (error: HttpErrorResponse): Observable<any> => {
    return of(this.commonService.handleErrors(
      error.status,
      this.authService.handleUnauthorizedError.bind(this.authService),
    ));
  }
}
