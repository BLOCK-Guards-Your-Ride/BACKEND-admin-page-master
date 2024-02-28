import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StationResponse } from '../../shared/models/response';
import { StationInfoType } from '../../shared/models/station';
import { StationService } from '../services/station.service';


@Injectable()
export class StationResolver implements Resolve<StationInfoType | string> {

  constructor(private stationService: StationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ): StationInfoType | string | Observable<StationInfoType | string> | Promise<StationInfoType | string> {
    return this.stationService.getStation(route.params.stationId).pipe(
      map((response: StationResponse) => {
        if (response.station) {
          return response.station;
        }
        return response.toString();
      }),
    );
  }

}
