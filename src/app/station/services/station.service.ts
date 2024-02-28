import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';

import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { BaseService } from '../../core/services/base.service';
import { ConnectionMetadataType } from '../../shared/models/connection-metadata';
import { StationDockOrdersType, StationDockParamsType, StationDockType } from '../../shared/models/dock';
import { StationPictureResponse } from '../../shared/models/picture';
import { PLCMetadataType } from '../../shared/models/plc-metadata';
import { PaginationParamsType } from '../../shared/models/request';
import {
  BaseResponse,
  ConnectionMetadataResponse,
  DockResponse,
  PLCMetadataResponse,
  StationAssetQueryResponse,
  StationDockQueryResponse,
  StationQueryResponse,
  StationResponse,
} from '../../shared/models/response';
import { StationImageOrdersType } from '../../shared/models/sensor';
import {
  CoordinateParamsType,
  OptionalStationType,
  StationOrdersType,
  StationParamsType,
  StationStateType,
  StationTariffType,
  StationType,
} from '../../shared/models/station';

@Injectable()
export class StationService extends BaseService {

  private plcMetadataSuffix: string;
  private connectionMetadataSuffix: string;

  constructor(
    injector: Injector,
    private authService: AuthService) {

    super('stations', injector);
    this.plcMetadataSuffix = 'plcMetadata';
    this.connectionMetadataSuffix = 'connectionMetadata';
  }

  fetchStations(
    paginationParams: PaginationParamsType,
    orders: StationOrdersType[],
    params: StationParamsType[],
    coordinateParams: CoordinateParamsType): Observable<StationQueryResponse> {

    return this.httpClient.post<StationQueryResponse>(`${this.urlPrefix}/query`, this.commonService.createRequest({
      orders,
      paginationParams,
      params,
      coordinateParams,
    }));
  }

  createStation(station: StationType): Observable<string> {
    return this.httpClient.post<StationResponse>(`${this.urlPrefix}`, this.commonService.createRequest({
      station,
    })).pipe(
      mapTo(null),
      catchError((error: HttpErrorResponse) =>
        of(this.commonService.handleErrors(
          error.status,
          this.authService.handleUnauthorizedError.bind(this.authService),
          { 422: 'UNIQUE_IDENTIFIER_IS_NOT_UNIQUE' },
        ))),
    );
  }

  editStation(stationId: string, station: OptionalStationType, tariffIntervalTypes?: StationTariffType): Observable<string> {
    if (isNotNullOrUndefined(tariffIntervalTypes.tariffPeriodList) && tariffIntervalTypes.tariffPeriodList.length > 0) {
      tariffIntervalTypes.tariffPeriodList.forEach(value => {
        if (!value.fromTime.includes('T00:00:00Z')) {
          value.fromTime += 'T00:00:00Z';
        }
        if (!value.toTime.includes('T23:59:59Z')) {
          value.toTime += 'T23:59:59Z';
        }
        if (value.tariffType == 'ABSOLUTE') {
          value.tariffIntervalList.forEach(value => {
            if (value.fromTime != undefined && !value.fromTime.includes(':00Z')) {
              value.fromTime += ':00Z';
            }
            if (value.toTime != undefined && !value.toTime.includes(':00Z')) {
              value.toTime += ':00Z';
            }
          });
        }
      });
      station.stationTariff = tariffIntervalTypes;
    }
    return this.httpClient.put<StationResponse>(`${this.urlPrefix}/${stationId}`, this.commonService.createRequest({
      station,
    })).pipe(
      mapTo(null),
      catchError((error: HttpErrorResponse) =>
        of(this.commonService.handleErrors(
          error.status,
          this.authService.handleUnauthorizedError.bind(this.authService),
          { 422: 'UNIQUE_IDENTIFIER_IS_NOT_UNIQUE' },
        ))),
    );
  }

  getStation(stationId: string): Observable<StationResponse | string> {
    return this.httpClient.get<StationResponse>(`${this.urlPrefix}/${stationId}`).pipe(
      catchError(this.handleError),
    );
  }

  setPLCMetadata(plcMetadata: PLCMetadataType, stationId: string): Observable<PLCMetadataResponse | string> {
    return this.httpClient.put<PLCMetadataResponse>(
      `${this.urlPrefix}/${stationId}/${this.plcMetadataSuffix}`,
      this.commonService.createRequest({
        plcMetadata,
      }),
    ).pipe(
      catchError(this.handleError),
    );
  }

  getPLCMetadata(stationId: string): Observable<PLCMetadataResponse | string> {
    return this.httpClient.get<PLCMetadataResponse>(`${this.urlPrefix}/${stationId}/${this.plcMetadataSuffix}`).pipe(
      catchError(this.handleError),
    );
  }

  setStationConnectionData(connectionMetadata: ConnectionMetadataType, stationId: string) {
    return this.httpClient.put<BaseResponse>(
      `${this.urlPrefix}/${stationId}/${this.connectionMetadataSuffix}`,
      this.commonService.createRequest({
        connectionMetadata,
      }),
    ).pipe(
      catchError(this.handleError),
    );
  }

  getStationConnectionData(stationId: string): Observable<ConnectionMetadataResponse | string> {
    return this.httpClient.get<ConnectionMetadataResponse>(`${this.urlPrefix}/${stationId}/${this.connectionMetadataSuffix}`).pipe(
      catchError(this.handleError),
    );
  }

  fetchStationDocks(
    stationId: string,
    paginationParams: PaginationParamsType,
    orders: StationDockOrdersType[],
    params: StationDockParamsType[]): Observable<StationDockQueryResponse> {

    return this.httpClient.post<StationDockQueryResponse>(
      `${this.urlPrefix}/${stationId}/docks/query`,
      this.commonService.createRequest({
        orders,
        paginationParams,
        params,
      }));
  }

  fetchStationAssets(
    stationId: string,
    paginationParams: PaginationParamsType,
    orders: StationImageOrdersType[],
    params: StationParamsType[]): Observable<StationAssetQueryResponse> {
    return this.httpClient.post<StationAssetQueryResponse>(
      `${this.urlPrefix}/${stationId}/assets/query`,
      this.commonService.createRequest({
        orders,
        paginationParams,
        params,
      }));
  }

  stopParkingSession(stationId: string, dockNr: number, dock: StationDockType): Observable<DockResponse | string> {
    return this.httpClient.put<DockResponse>(`${this.urlPrefix}/${stationId}/docks/${dockNr}`, this.commonService.createRequest({
      dock,
    })).pipe(
      catchError(this.handleError),
    );
  }

  setStationState(stationId: string, state: StationStateType) {
    return this.httpClient.put<StationResponse>(
      `${this.urlPrefix}/${stationId}`,
      this.commonService.createRequest({ station: { state } }),
    ).pipe(
      catchError(this.handleError),
    );
  }

  fetchSensors(stationId: string) {
    return this.httpClient.get(`${this.urlPrefix}/${stationId}/sensors`);
  }

  pushStationPicture(stationId: string): Observable<StationPictureResponse> {
    return this.httpClient.post<StationPictureResponse>(`${this.urlPrefix}/${stationId}/assets`, {});
  }

  fetchMetricsData(stationId: string) {
    return this.httpClient.get(`${this.urlPrefix}/${stationId}/metrics`);
  }

  private handleError = (error: HttpErrorResponse): Observable<any> => {
    return of(this.commonService.handleErrors(
      error.status,
      this.authService.handleUnauthorizedError.bind(this.authService),
    ));
  };

}
