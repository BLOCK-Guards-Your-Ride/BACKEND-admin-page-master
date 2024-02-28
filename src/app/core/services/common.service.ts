import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CommonService {

  constructor(private cookieService: CookieService) { }

  createRequest(body: any) {
    return {
      ...body,
      meta: {
        requestId: Number(new Date()),
        timestamp: new Date(),
      },
    };
  }

  setCookie(name: string, value: string, expires: number | Date) {
    this.cookieService.set(name, value, expires, '/');
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  handleErrors(errorCode: number, handleUnauthorizedErrorFn?: Function, customErrors?: { [key: number]: string }): string {
    if (handleUnauthorizedErrorFn) {
      handleUnauthorizedErrorFn(errorCode);
    }
    const errorMessageFn = ((errorCode: number) => ({
      ...customErrors,
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      500: 'SERVER_ERROR',
    })[errorCode]);
    return errorMessageFn(errorCode);
  }
}
