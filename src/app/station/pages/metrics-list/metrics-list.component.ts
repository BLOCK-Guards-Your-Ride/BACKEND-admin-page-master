import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ListComponent } from '../../../shared/classes/list.component';
import { defaultListState } from '../../../shared/models/common';
import { StationService } from '../../services/station.service';
import { MetricsListDatasource } from './metrics-list.datasource';

@Component({
  selector: 'app-metrics-list',
  templateUrl: './metrics-list.component.html',
  styleUrls: ['./metrics-list.component.scss'],
})
export class MetricsListComponent extends ListComponent implements OnInit {

  public backRoute: string;
  public errorMessage: string;


  constructor(public stationService: StationService, public activatedRoute: ActivatedRoute, public router: Router) {
    super(new MetricsListDatasource(stationService, activatedRoute.snapshot.params.stationId),
      [
        'metricType',
        'metricStatus',
        'message',
      ],
      defaultListState,
      router,

    );
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
