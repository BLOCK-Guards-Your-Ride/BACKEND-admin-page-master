import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import {
  moduleNames,
} from '../../../shared/models/common';
import { ConnectionMetadataInfoType } from '../../../shared/models/connection-metadata';
import { BaseResponse } from '../../../shared/models/response';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-station-connection-data-form',
  templateUrl: './station-connection-data-form.component.html',
  styleUrls: ['./station-connection-data-form.component.scss'],
})
export class StationConnectionDataFormComponent implements OnInit {

  private stationId: string;
  public errorMessage: string;
  private connectionMetadata: ConnectionMetadataInfoType;
  public stationConnectionDataFromGroup: FormGroup;
  public backRoute: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stationService: StationService) {

    this.backRoute = moduleNames.station;
  }

  ngOnInit() {
    this.stationId = this.activatedRoute.snapshot.params.stationId;
    this.connectionMetadata = this.activatedRoute.snapshot.data.connectionMetadata;
    this.stationConnectionDataFromGroup = new FormGroup({
      apiVersion: new FormControl(this.connectionMetadata.apiVersion),
      authenticationData: new FormControl(this.connectionMetadata.authenticationData),
      host: new FormControl(this.connectionMetadata.host),
      port: new FormControl(this.connectionMetadata.port),
    });
  }

  submitStationConnectionData(form: NgForm) {
    if (form.valid) {
      this.stationService.setStationConnectionData(form.value, this.stationId).pipe(
        tap((response: BaseResponse) => {
          if (response.meta) {
            this.router.navigate([moduleNames.station]);
          } else {
            this.errorMessage = response.toString();
          }
        }),
      ).subscribe();
    }
  }

}
