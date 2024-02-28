import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DockType } from '../../../shared/models/plc-metadata';

@Component({
  selector: 'app-dock-item',
  templateUrl: './dock-item.component.html',
  styleUrls: ['./dock-item.component.scss'],
})
export class DockItemComponent {

  @Input() dockItem: DockType;
  @Output() delete: EventEmitter<null>;
  @Output() updateDockItem: EventEmitter<DockType>;

  constructor() {
    this.delete = new EventEmitter<null>();
    this.updateDockItem = new EventEmitter<DockType>();
  }

  deleteSelf() {
    this.delete.emit();
  }

  updateDockNr(dockNr: number) {
    this.dockItem.dockNr = dockNr;
    this.updateDockItem.emit(this.dockItem);

  }

  updateEnabled(enabled: MatSlideToggleChange) {
    this.dockItem.enabled = enabled.checked;
    this.updateDockItem.emit(this.dockItem);
  }

}
