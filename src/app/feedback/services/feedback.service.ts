import { Injectable, Injector } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseService } from '../../core/services/base.service';
import { FeedbackOrdersType, FeedbackParamsType } from '../../shared/models/feedback';
import { PaginationParamsType } from '../../shared/models/request';
import { FeedbackQueryResponse } from '../../shared/models/response';

@Injectable()
export class FeedbackService extends BaseService {

  constructor(injector: Injector) {
    super('feedbacks', injector);
  }

  fetchFeedbacks(
    paginationParams: PaginationParamsType,
    orders: FeedbackOrdersType[],
    params: FeedbackParamsType[]): Observable<FeedbackQueryResponse> {

    return this.httpClient.post<FeedbackQueryResponse>(`${this.urlPrefix}/query`, this.commonService.createRequest({
      orders,
      paginationParams,
      params,
    }));
  }
}
