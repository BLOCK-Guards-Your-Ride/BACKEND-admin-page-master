import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionMetadataInfoType } from '../../shared/models/connection-metadata';
import { ConnectionMetadataResponse } from '../../shared/models/response';
import { StationService } from '../services/station.service';

@Injectable()
export class StationConnectionDataResolver implements Resolve<ConnectionMetadataInfoType | string> {

  constructor(private stationService: StationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ): string
    | ConnectionMetadataInfoType
    | Observable<string | ConnectionMetadataInfoType>
    | Promise<string | ConnectionMetadataInfoType> {

    return this.stationService.getStationConnectionData(route.params.stationId)
      .pipe(
        map((response: ConnectionMetadataResponse) => {
          if (response.connectionMetadata) {
            return response.connectionMetadata;
          }
          return response.toString();
        }),
      );
  }

}
