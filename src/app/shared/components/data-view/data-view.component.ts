import { ChangeDetectionStrategy, Component, Input, OnInit, PipeTransform } from '@angular/core';
import { keys } from 'lodash';

export type DataViewPipe = { prop: string, pipe: PipeTransform };

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewComponent implements OnInit {

  _keys: any = keys;

  @Input() data: Object = {
    id: '00ia34',
    name: 'BLOCK',
    role: 'Adminisztaror',
    enabled: true,
    organization: 'Vallalat',
  }
  @Input() labelPrefix: string;

  @Input() pipes: DataViewPipe[] = [];

  ngOnInit() {
    if (!this.labelPrefix) {
      throw Error('ERROR: labelPrefix is required!');
    }
  }

  getPipe(property: string): PipeTransform {
    const foundPipe = this.pipes.find(p => p.prop === property);
    if (foundPipe) {
      return foundPipe.pipe;
    }
    return null;
  }

}
