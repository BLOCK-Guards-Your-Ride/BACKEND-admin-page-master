import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListDataSource } from 'src/app/shared/classes/list.datasource';
import { FeedbackService } from '../../services/feedback.service';
import {
  FeedbackOrdersType,
  FeedbackParamsType,
  FeedbackRowType,
} from './../../../shared/models/feedback';
import { PaginationParamsType } from './../../../shared/models/request';
import { FeedbackQueryResponse } from './../../../shared/models/response';

export class FeedbackDataSource extends ListDataSource<FeedbackRowType> {

  constructor(private feedbackService: FeedbackService) {
    super();
  }

  fetch(
    paginationParams: PaginationParamsType = { page: 0, rows: 10 },
    orders: FeedbackOrdersType[] = null,
    params: FeedbackParamsType[] = null) {
    super.getLoadingState().next(true);
    this.feedbackService.fetchFeedbacks(paginationParams, orders, params)
      .pipe(
        catchError(() => {
          this.getLoadingState().next(false);
          return EMPTY;
        }),
      )
      .subscribe((response: FeedbackQueryResponse) => {
        this.getLoadingState().next(false);
        this.getList().next(response.list.rows);
        this.setLength(response.queryParams.totalRows);
      });
  }
}
