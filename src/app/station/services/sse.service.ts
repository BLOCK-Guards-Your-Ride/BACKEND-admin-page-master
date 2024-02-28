import { Injectable, Injector, NgZone } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../core/services/base.service';

import 'event-source-polyfill/src/eventsource.min.js'

declare var EventSourcePolyfill: any;

@Injectable({
  providedIn: 'root',
})
export class SseService extends BaseService {

  constructor(private _zone: NgZone, injector: Injector, private keycloakService: KeycloakService) {
    super('stations', injector);
  }

  getServerSentEvent(stationId: string): Observable<any> {
    return new Observable(observer => {

      this.keycloakService.getToken().then(value => {
        const eventSource = this.getEventSource(`${environment.baseUrl}/rest/${this.urlPrefix}/${stationId}/assets/events`, value);
        eventSource.onmessage = event => {
          this._zone.run(() => {
            observer.next(event);
          });
        };
        eventSource.onerror = error => {
          this._zone.run(() => {
            observer.error(error);
          });
        };
      })
    });
  }

  private getEventSource(url: string, token: string): EventSource {
    return new EventSourcePolyfill(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
