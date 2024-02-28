import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgModel,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounce } from 'lodash';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AutocompleteData } from '../../models/common';

interface AutocompDataType {
  label: string;
  value: any;  
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AutocompleteComponent implements ControlValueAccessor {

  value: string;
  _onChange: (_: any) => void;
  _onTouched: () => void;
  disabled: boolean;
  options: Observable<AutocompDataType[]>;
  debounceOnChange = debounce(this.onChange, 300);
  
  @Input() placeholder: string;
  @Input() color = 'primary';
  @Input() required: boolean;

  @ViewChild('autocompInput') autocompleteInput: NgModel;
  @Input() fetchFn: (query: string) => Observable<AutocompDataType[]> = () => of([]);

  writeValue(obj: any): void {
    this.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(ev: string) {
    if (ev) {
      this.options = this.fetchFn(ev).pipe(
        first(),
        tap((res: AutocompleteData[]) => {
          if (res && res.length && res[0].label.toUpperCase() === ev.toUpperCase()) {
            this._onChange(res[0].value);
          } else {
            this._onChange(null);
          }
        }),
      );
    } else {
      this.options = of([]);
      this._onChange(null);
    }
    this.autocompleteInput.valueAccessor.writeValue(ev);
  }

  onOptionSelected(ev: MatAutocompleteSelectedEvent) {
    this.onChange(ev.option.value.label);
  }

}
