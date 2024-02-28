import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { ClientInformationInfoType } from '../../../shared/models/client-information';
import { moduleNames, SnackBarSuffix } from '../../../shared/models/common';
import { ClientInformationService } from '../../services/client-information.service';

@Component({
  selector: 'app-client-information-form',
  templateUrl: './client-information-form.component.html',
  styleUrls: ['./client-information-form.component.scss'],
})
export class ClientInformationFormComponent implements OnInit {

  public isLoading: boolean;
  public errorMessage: string;
  public clientInformationFormGroup: FormGroup;
  public clientInformation: ClientInformationInfoType;
  public backRoute: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private clientInformationService: ClientInformationService) {
    this.isLoading = false;
    this.backRoute = moduleNames.client_information;
  }

  ngOnInit() {
    this.initializeFormGroups();
    this.clientInformation = this.activatedRoute.snapshot.data.clientInformation;
    if (this.clientInformation && typeof (this.clientInformation) !== 'string') {
      this.clientInformationFormGroup.setValue({
        phoneClientVersion: this.clientInformation.phoneClientVersion,
        validFrom: this.clientInformation.validFrom,
        validTo: this.clientInformation.validTo,
      });
    } else if (this.clientInformation) {
      this.errorMessage = this.clientInformation.toString();
    }
  }

  createClientInformation() {
    if (this.clientInformationFormGroup.valid) {
      this.prepareForAsync();
      this.clientInformationService.createClientInformation(this.clientInformationFormGroup.value)
        .subscribe((status: string) => this.handleResponse(status, true));
    }
  }

  saveClientInformationAndExit() {
    if (this.clientInformationFormGroup.valid) {
      this.prepareForAsync();
      this.ediClientInformation(this.clientInformationFormGroup.value, true);
    }
  }

  saveClientInformation() {
    if (this.clientInformationFormGroup.valid) {
      this.prepareForAsync();
      this.ediClientInformation(this.clientInformationFormGroup.value, false);
    }
  }

  private ediClientInformation(value: ClientInformationInfoType, toNavigate: boolean) {
    this.clientInformationService.editClientInformation(this.clientInformation.id, value)
      .subscribe((status: string) => this.handleResponse(status, toNavigate));
  }

  private handleSubmissionErrors(status: string) {
    this.errorMessage = status;
  }

  private handleResponse(status: string, toNavigate: boolean) {
    this.isLoading = false;
    if (status) {
      this.handleSubmissionErrors(status);
      return;
    }
    if (toNavigate) {
      this.router.navigate([moduleNames.client_information]);
    }
    const messageSuffix: SnackBarSuffix = this.clientInformation ? 'SAVE' : 'CREATE';
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: `APP.SNACK_BAR.SUCCESS.CLIENT_INFORMATION.${messageSuffix}`,
      panelClass: ['snack-bar', 'snack-bar--success'],
    });
  }

  private prepareForAsync() {
    this.errorMessage = null;
    this.isLoading = true;
  }

  private initializeFormGroups() {
    this.clientInformationFormGroup = new FormGroup({
      phoneClientVersion: new FormControl(),
      validFrom: new FormControl(),
      validTo: new FormControl(),
    });
  }

}
