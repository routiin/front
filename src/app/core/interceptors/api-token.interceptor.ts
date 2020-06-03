import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.includes(environment.api.hostURI)) {
      return next.handle(req);
    }

    const authToken =
      this._authService.getToken() || this._authService.getCheckedToken();

    if (authToken) {
      const cloneReq = req.clone({
        headers: req.headers.set(`Authorization`, `Bearer ${authToken}`),
      });
      return next.handle(cloneReq);
    }

    return next.handle(req);
  }
}
