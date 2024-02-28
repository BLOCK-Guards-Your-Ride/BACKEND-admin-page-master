import {
  Component,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent {

  @Input() formGroup: FormGroup;
  @Input() errorMessage: string;
  @Input() isEdit: boolean;
  @Input() backText: string;
  @Input() backRoute: string;
  @Input() title: string;
  @Input() errorPrefix: string;
  @Input() onSaveAndExit: () => void;
  @Input() onSave: () => void;
  @Input() onCreate: () => void;
  @Input() isLoading: boolean;

}
