import { MouseEvent } from '@agm/core/map-types';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { moduleNames, SnackBarSuffix } from 'src/app/shared/models/common';
import { CoordinateType, StationInfoType, StationTariffType, StationType, TariffPeriodType } from '../../../shared/models/station';
import { StationService } from '../../services/station.service';

@Component({
  selector: 'app-station-form',
  templateUrl: './station-form.component.html',
  styleUrls: ['./station-form.component.scss'],
})
export class StationFormComponent implements OnInit {

  public stationTariffType: StationTariffType = { tariffPeriodList: null };
  public stationFormGroup: FormGroup;
  public positionFormGroup: FormGroup;
  public errorMessage: string;
  public station: StationInfoType;
  public position: CoordinateType;
  public isCoordsLoading: boolean;
  public backRoute: string;
  private stationQrCodeSuffix: string;
  public isLoading: boolean;
  public tariffPeriodList: TariffPeriodType[];
  public tariffFieldStates: boolean[];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stationService: StationService) {

    this.isLoading = false;
    this.isCoordsLoading = true;
    this.position = {
      lat: null,
      lng: null,
    };
    this.backRoute = moduleNames.station;
    this.stationQrCodeSuffix = '-STATION';
  }

  ngOnInit() {
    this.initiateFormGroups();

    this.station = this.activatedRoute.snapshot.data.station;

    if (this.station != undefined) {
      this.tariffPeriodList = this.station.stationTariff?.tariffPeriodList || [];
    }

    if (this.station && typeof (this.station) !== 'string') {
      const stationQrCode = this.station.stationQrCode.slice(0, this.station.stationQrCode.lastIndexOf(this.stationQrCodeSuffix));
      this.stationFormGroup.setValue({
        stationQrCode,
        name: this.station.name,
        description: this.station.description,
        position: this.station.position,
        address: this.station.address,
      });
      this.position = this.station.position;
      this.isCoordsLoading = false;
    } else if (this.station) {
      this.errorMessage = this.station.toString();
    }

    if (!this.station && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.setCurrentPosition.bind(this),
        this.setDefaultPosition.bind(this),
      );
    } else if (!this.station) {
      this.setDefaultPosition();
    }
  }

  setTariffIntervalTypes(event: TariffPeriodType[]) {
    this.tariffPeriodList = event;
  }

  setTariffFormIsValid(fieldStates: boolean[]) {
    this.tariffFieldStates = fieldStates;
  }

  private setCurrentPosition(position: Position) {
    this.setFormPosition(position);
    this.isCoordsLoading = false;
  }

  private setDefaultPosition() {
    this.setFormPosition();
    this.isCoordsLoading = false;
  }

  private initiateFormGroups() {
    this.positionFormGroup = new FormGroup({
      lng: new FormControl(),
      lat: new FormControl(),
    });
    this.stationFormGroup = new FormGroup({
      name: new FormControl(),
      stationQrCode: new FormControl(),
      address: new FormControl(),
      description: new FormControl(),
      position: this.positionFormGroup,
    });
  }

  private setFormPosition(position = { coords: { latitude: 47.505265, longitude: 19.041969 } }) {
    this.position.lat = position.coords.latitude;
    this.position.lng = position.coords.longitude;
    this.positionFormGroup.setValue({
      lat: this.position.lat,
      lng: this.position.lng,
    });
  }

  createStation() {
    if (this.stationFormGroup.valid) {
      this.prepareForAsync();
      this.stationService.createStation(this.prepareStation(this.stationFormGroup.value))
        .subscribe((status: string) => {
          this.handleResponse(status, true);
        });
    }
  }

  saveStation() {
    if (this.stationFormGroup.valid) {
      this.prepareForAsync();
      this.ediStation(this.stationFormGroup.value, false);
    }
  }

  saveStationAndExit() {
    if (this.stationFormGroup.valid) {
      this.prepareForAsync();
      this.ediStation(this.stationFormGroup.value, true);
    }
  }

  onMapClick(ev: MouseEvent) {
    if (ev && ev.coords) {
      this.positionFormGroup.setValue({
        lat: ev.coords.lat,
        lng: ev.coords.lng,
      });
    }
  }

  private prepareStation(station: StationType): StationType {
    return {
      ...station,
      stationQrCode: `${station.stationQrCode.toUpperCase()}${this.stationQrCodeSuffix}`,
    };
  }

  private ediStation(value: StationInfoType, toNavigate: boolean) {
    this.stationTariffType.tariffPeriodList = this.tariffPeriodList;
    this.stationService.editStation(this.station.stationId, this.prepareStation(value), this.stationTariffType)
      .subscribe((status: string) => this.handleResponse(status, toNavigate));
  }

  private handleSubmissionErrors(status: string) {
    this.errorMessage = status;
  }

  private prepareForAsync() {
    this.errorMessage = null;
    this.isLoading = true;
  }

  private handleResponse(status: string, toNavigate: boolean) {
    this.isLoading = false;
    if (status) {
      this.handleSubmissionErrors(status);
      return;
    }
    if (toNavigate) {
      this.router.navigate([moduleNames.station]);
    }
    const messageSuffix: SnackBarSuffix = this.station ? 'SAVE' : 'CREATE';
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: `APP.SNACK_BAR.SUCCESS.${messageSuffix}`,
      panelClass: ['snack-bar', 'snack-bar--success'],
    });
  }
}
