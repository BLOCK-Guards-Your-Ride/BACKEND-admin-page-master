import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { moduleNames } from '../../../shared/models/common';
import { PLCMetadataInfoType } from '../../../shared/models/plc-metadata';
import { PLCMetadataResponse } from '../../../shared/models/response';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-plc-metadata-form',
  templateUrl: './plc-metadata-form.component.html',
  styleUrls: ['./plc-metadata-form.component.scss'],
})
export class PlcMetadataFormComponent implements OnInit {

  public plcFormGroup: FormGroup;
  private stationId: string;
  public backRoute: string;
  public errorMessage: string;
  private plcMetadata: PLCMetadataInfoType;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stationService: StationService) { }

  ngOnInit() {
    this.plcMetadata = this.activatedRoute.snapshot.data.plcMetadata;
    this.plcFormGroup = new FormGroup({
      plcIdentifier: new FormControl(this.plcMetadata.plcIdentifier),
      publicKey: new FormControl(this.plcMetadata.publicKey),
      totalDocks: new FormControl(this.plcMetadata.totalDocks),
      dockList: new FormControl(this.plcMetadata.dockList || []),
    });
    this.stationId = this.activatedRoute.snapshot.params.stationId;
    this.backRoute = moduleNames.station;
  }

  submitPLMetadata(form: NgForm) {
    if (form.valid) {
      this.stationService.setPLCMetadata(form.value, this.stationId).pipe(
        tap((response: PLCMetadataResponse) => {
          if (response.plcMetadata) {
            this.router.navigate([moduleNames.station]);
          } else {
            this.errorMessage = response.toString();
          }
        }),
      ).subscribe();
    }
  }

}
