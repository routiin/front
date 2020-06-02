import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes('api.routtin.ru')) {
      return next.handle(req);
    }

    const authToken =
      this._authService.getToken() || this._authService.getCheckedTocken();

    if (authToken) {
      const cloneReq = req.clone({
        headers: req.headers.set(`Authorization`, `Bearer ${authToken}`),
      });
      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
