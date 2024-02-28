import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rate-display',
  templateUrl: './rate-display.component.html',
  styleUrls: ['./rate-display.component.scss'],
})
export class RateDisplayComponent {

  @Input() rate: number;

}
