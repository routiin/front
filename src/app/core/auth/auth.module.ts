import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  ActivationEnd,
  NavigationEnd,
} from '@angular/router';
import { from, race, of, combineLatest, EMPTY, Observable } from 'rxjs';
import {
  filter,
  map,
  pluck,
  switchMap,
  take,
  tap,
  catchError,
  pairwise,
  startWith,
} from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';

const EMPTY_AUTH_ERR_MESS = 'Unknown authorization error. Please try later';

@NgModule({
  imports: [MatSnackBarModule, RouterModule.forChild([])],
})
export class AuthModule {
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _sanitizer: DomSanitizer
  ) {
    combineLatest([
      this._router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ),
      this._route.queryParams,
    ])
      .pipe(
        take(1),
        switchMap(([event, { token, error }]) =>
          token ? _authService.setToken(token) : this._showError(error)
        ),
        tap(() => this._router.navigate(['/']))
      )
      .subscribe();
  }

  private _showError(error: string): Observable<null> {
    if (!error) {
      return of(null);
    }

    return of(error).pipe(
      tap(() =>
        this._snackBar.open(
          this._sanitizer.sanitize(0, error) || EMPTY_AUTH_ERR_MESS,
          'OK'
        )
      ),
      map(() => null)
    );
  }
}
