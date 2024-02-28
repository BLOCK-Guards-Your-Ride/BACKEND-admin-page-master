import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { DockType } from '../../../shared/models/plc-metadata';

@Component({
  selector: 'app-dock-list-form',
  templateUrl: './dock-list-form.component.html',
  styleUrls: ['./dock-list-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DockListFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DockListFormComponent),
      multi: true,
    },
  ],
  animations: [
    trigger('newItem', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-57px)',
        }),
        animate(90, style({
          opacity: .5,
          transform: 'translateY(-50px)',
        })),
        animate(100),
      ]),
      transition('* => void', [
        animate(200, style({
          transform: 'scale(1, 0) translateY(-57px)',
        })),
      ]),
    ]),
  ],
})
export class DockListFormComponent implements ControlValueAccessor, Validator {

  public dockList: DockType[];
  public onChamge: () => void;
  public onTouched: () => void;
  public validationChange: () => void;
  public isDisbaled: boolean;

  writeValue(obj: DockType[]): void {
    this.dockList = obj;
  }
  registerOnChange(fn: any): void {
    this.onChamge = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisbaled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors {
    let error: {
      [key: string]: boolean,
    };
    control.value.forEach((dockItem: DockType) => {
      if (dockItem.dockNr === null || dockItem.dockNr === undefined) {
        error = { required: true };
      }
    });
    return error;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validationChange = fn;
  }

  addDock() {
    this.dockList.push({
      dockNr: null,
      enabled: false,
    });
    this.validationChange();
  }

  updateDockItem(dockItem: DockType, index: number) {
    this.dockList[index] = dockItem;
    this.validationChange();
  }

  deleteDock(dockIndex: number) {
    this.dockList.splice(dockIndex, 1);
    this.validationChange();
  }

  deleteAllDocks() {
    this.dockList.splice(0, this.dockList.length);
    this.validationChange();
  }

}
