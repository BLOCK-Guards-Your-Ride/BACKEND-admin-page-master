import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PLCMetadataInfoType } from '../../shared/models/plc-metadata';
import { PLCMetadataResponse } from '../../shared/models/response';
import { StationService } from '../services/station.service';

@Injectable()
export class PLCMetadataResolver implements Resolve<PLCMetadataInfoType | string> {

  constructor(private stationService: StationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
  ): PLCMetadataInfoType | string | Observable<PLCMetadataInfoType | string> | Promise<PLCMetadataInfoType | string> {
    return this.stationService.getPLCMetadata(route.params.stationId)
      .pipe(
        map((response: PLCMetadataResponse) => {
          if (response.plcMetadata) {
            return response.plcMetadata;
          }
          return response.toString();
        }),
      );
  }

}
