import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { ClientInformationService } from 'src/app/client-information/services/client-information.service';
import { ListComponent } from 'src/app/shared/classes/list.component';
import {
  moduleNames,
} from 'src/app/shared/models/common';
import { defaultClientInformationListState } from '../../../shared/models/client-information';
import { ClientInformationDataSource } from './client-information-list.datasource';

@Component({
  selector: 'app-client-information-list',
  templateUrl: './client-information-list.component.html',
  styleUrls: ['./client-information-list.component.scss'],
})
export class ClientInformationListComponent extends ListComponent {

  constructor(
    clientInformationService: ClientInformationService,
    public router: Router) {

    super(
      new ClientInformationDataSource(clientInformationService),
      [
        'creation-date',
        'phone-client-version',
        'valid-from',
        'valid-to',
        'edit',
      ],
      defaultClientInformationListState,
      router,
    );
  }

  editClientInformation(clientInformationId: number) {
    this.loading$ = of(true);
    this.router.navigate([moduleNames.client_information, clientInformationId]);
  }

}
