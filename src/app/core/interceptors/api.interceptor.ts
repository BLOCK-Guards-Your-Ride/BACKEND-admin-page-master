import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BASE_API_HREF } from '../tokens/api.token';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  private readonly baseUrl: string;

  constructor(@Inject(BASE_API_HREF) private baseHref: string) {
    this.baseUrl = environment.baseUrl;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('i18n')) {
      return next.handle(req);
    }
    const apiReq = req.clone({ url: `${this.baseUrl}/${this.baseHref}/${req.url}` });
    return next.handle(apiReq);
  }
}
