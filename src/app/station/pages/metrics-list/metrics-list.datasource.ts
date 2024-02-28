import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from '../../../shared/classes/list.datasource';
import { MetricType, StationMetricResponse } from '../../../shared/models/metrics';
import { StationService } from '../../services/station.service';

export class MetricsListDatasource extends ListDataSource<MetricType> {

  constructor(private stationService: StationService, private stationId: string) {
    super();
  }

  fetch() {
    super.getLoadingState().next(true);
    this.stationService.fetchMetricsData(this.stationId)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: StationMetricResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.stationStatus.metricList.rows);
        this.setLength(response.stationStatus.metricList.rows && response.stationStatus.metricList.rows.length);
      });
  }
}
