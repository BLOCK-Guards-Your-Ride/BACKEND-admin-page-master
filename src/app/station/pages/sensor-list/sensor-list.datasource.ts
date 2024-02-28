import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import { SensorListResponse } from '../../../shared/models/response';
import { SensorRowType } from '../../../shared/models/sensor';
import { StationService } from '../../services/station.service';

export class SensorListDataSource extends ListDataSource<SensorRowType> {

  constructor(private stationService: StationService, private stationId: string) {
    super();
  }

  fetch() {
    super.getLoadingState().next(true);
    this.stationService.fetchSensors(this.stationId).pipe(
      catchError(() => {
        this.getLoadingState().next(false);
        return EMPTY;
      }),
    ).subscribe(
      (response: SensorListResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.list.rows && response.list.rows.length);
      },
    )
  }
}
