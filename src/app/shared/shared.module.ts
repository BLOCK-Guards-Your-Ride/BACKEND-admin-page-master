import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { environment } from 'src/environments/environment';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { BaseDialogComponent } from './components/base-dialog/base-dialog.component';
import { BaseFormComponent } from './components/base-form/base-form.component';
import { DataViewComponent } from './components/data-view/data-view.component';
import { DaterangePickerComponent } from './components/daterange-picker/daterange-picker.component';
import { DockOperationDialogComponent } from './components/dialogs/dock-operation-dialog/dock-operation-dialog.component';
import { ListFilterComponent } from './components/list-filter/list-filter.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { PermissionDirective } from './directives/permission.directive';
import { DatepickerModule } from './modules/custom-datepicker.module';
import { MaterialImportsModule } from './modules/material-imports.module';
import { TranslateCommonPipe } from './pipes/translate-common.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    BackButtonComponent,
    DockOperationDialogComponent,
    SnackBarComponent,
    PasswordValidatorDirective,
    DaterangePickerComponent,
    ListFilterComponent,
    PermissionDirective,
    BaseFormComponent,
    AutocompleteComponent,
    DataViewComponent,
    TranslateCommonPipe,
    BaseDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey,
    }),
    MaterialImportsModule,
    DatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AgmCoreModule,
    LoadingSpinnerComponent,
    BackButtonComponent,
    DockOperationDialogComponent,
    SnackBarComponent,
    DatepickerModule,
    PasswordValidatorDirective,
    DaterangePickerComponent,
    TranslateModule,
    CommonModule,
    MaterialImportsModule,
    ListFilterComponent,
    PermissionDirective,
    BaseFormComponent,
    AutocompleteComponent,
    DataViewComponent,
    TranslateCommonPipe,
    BaseDialogComponent,
  ],
})
export class SharedModule { }
