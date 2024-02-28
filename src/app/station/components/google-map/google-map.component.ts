import { MouseEvent } from '@agm/core/map-types';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {

  @Input() lat: number;
  @Input() lng: number;
  @Input() markerLat: number;
  @Input() markerLng: number;
  @Input() zoom = 15;
  @Input() height: number;

  @Output() mapClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  onMapClick(ev: MouseEvent) {
    this.mapClick.emit(ev);
  }

}
