import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ListComponent } from '../../../shared/classes/list.component';
import { defaultListState } from '../../../shared/models/common';
import { StationService } from '../../services/station.service';
import { SensorListDataSource } from './sensor-list.datasource';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
})
export class SensorListComponent extends ListComponent implements OnInit {

  public backRoute: string;

  // @ts-
  constructor(public stationService: StationService, public activatedRoute: ActivatedRoute, router: Router) {
    super(new SensorListDataSource(stationService, activatedRoute.snapshot.params.stationId),
      [
        'value',
        'name',
        'type',
      ],
      defaultListState,
      router,

    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
