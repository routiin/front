import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isUserLoggedIn()) {
      this._router.navigate(['/']);
      return false;
    }

    return true;
  }
}
