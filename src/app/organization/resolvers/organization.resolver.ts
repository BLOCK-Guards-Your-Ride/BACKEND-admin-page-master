import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrganizationInfoType } from 'src/app/shared/models/organization';
import { OrganizationService } from '../services/organization.service';

@Injectable()
export class OrganizationResolver implements Resolve<{ info?: OrganizationInfoType, error?: string }>{

  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{ info?: OrganizationInfoType, error?: string }> {
    return this.organizationService.getOrganization(route.params.orgId).pipe(
      map((response) => {
        if (response.organization) {
          return {
            info: response.organization,
          };
        }
        return {
          error: response.toString(),
        }
      }),
    );
  }

}
