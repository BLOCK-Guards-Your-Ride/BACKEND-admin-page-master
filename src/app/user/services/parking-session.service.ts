import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { StationDockType } from 'src/app/shared/models/dock';
import { BaseService } from '../../core/services/base.service';
import { ParkingSessionOrdersType, ParkingSessionParamsType } from '../../shared/models/parking-session';
import {
  PaginationParamsType,
} from '../../shared/models/request';
import {
  DockResponse,
  ParkingSessionQueryResponse,
} from '../../shared/models/response';

@Injectable()
export class ParkingSessionService extends BaseService {

  constructor(
    injector: Injector,
    private authService: AuthService) {
    super('parkingSessions', injector);
  }

  fetchParkingSessions(
    paginationParams: PaginationParamsType,
    orders?: ParkingSessionOrdersType[],
    params?: ParkingSessionParamsType[]) {

    return this.httpClient.post<ParkingSessionQueryResponse>(`${this.urlPrefix}/query`, this.commonService.createRequest({
      paginationParams,
      orders,
      params,
    }));
  }

  stopParkingSession(stationId: number, dockNr: number, dock: StationDockType): Observable<DockResponse | string> {
    return this.httpClient.put<DockResponse>(`stations/${stationId}/docks/${dockNr}`, this.commonService.createRequest({
      dock,
    })).pipe(
      catchError(this.handleError),
    );
  }

  private handleError = (error: HttpErrorResponse): Observable<any> => {
    return of(this.commonService.handleErrors(
      error.status,
      this.authService.handleUnauthorizedError.bind(this.authService),
    ));
  }

}
