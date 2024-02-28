import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientInformationInfoType } from '../../shared/models/client-information';
import { ClientInformationResponse } from '../../shared/models/response';
import { ClientInformationService } from '../services/client-information.service';

@Injectable()
export class ClientInformationResolver implements Resolve<ClientInformationInfoType | string> {

  constructor(private clientInformationService: ClientInformationService) { }

  resolve(route: ActivatedRouteSnapshot):
    ClientInformationInfoType | string | Observable<ClientInformationInfoType | string> | Promise<ClientInformationInfoType | string> {
    return this.clientInformationService.getClientInformations(route.params.clientInformationId).pipe(
      map((response: ClientInformationResponse) => {
        if (response.clientInformation) {
          return response.clientInformation;
        }
        return response.toString();
      }),
    );
  }
}
