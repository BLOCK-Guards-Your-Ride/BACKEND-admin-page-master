import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  Injector,
} from '@angular/core';

import { CommonService } from './common.service';

@Injectable()
export class BaseService {

  protected commonService: CommonService;
  protected httpClient: HttpClient;

  constructor(protected urlPrefix: string, injector: Injector) {
    this.commonService = injector.get(CommonService);
    this.httpClient = injector.get(HttpClient);
  }

}
