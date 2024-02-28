import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-daterange-picker',
  templateUrl: './daterange-picker.component.html',
  styleUrls: ['./daterange-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DaterangePickerComponent {

  @Input() placeholder: string;
  @Input() required: boolean;

  @Output() fromUpdate: EventEmitter<any>;
  @Output() toUpdate: EventEmitter<any>;

  constructor() {
    this.fromUpdate = new EventEmitter<any>();
    this.toUpdate = new EventEmitter<any>();
  }

}
