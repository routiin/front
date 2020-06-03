import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { combineLatest, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const EMPTY_AUTH_ERR_MESS = 'Unknown authorization error. Please try later';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _checkedToken: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient,
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
          token ? this.setToken(token) : this._showError(error)
        )
      )
      .subscribe();
  }

  setToken(token: string) {
    this._checkedToken = token;

    if (!environment.production) {
      localStorage.setItem('token', token);
      return of(true).pipe(switchMap(() => this._router.navigate(['/'])));
    }

    return (
      this._http.get(environment.api.getUserURI).pipe(
        catchError((err) => {
          localStorage.removeItem('token');
          console.log('ERROR', err);
          return of(null);
        }),
        tap((response) =>
          response ? localStorage.setItem('token', token) : null
        )
      ),
      switchMap(() => this._router.navigate(['/']))
    );
  }

  private _showError(error: string) {
    if (!error) {
      return of(null);
    }

    return combineLatest([of(error), this._router.navigate(['/'])]).pipe(
      tap(() =>
        this._snackBar.open(
          this._sanitizer.sanitize(0, error) || EMPTY_AUTH_ERR_MESS,
          'OK'
        )
      )
    );
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCheckedToken(): string | null {
    return this._checkedToken;
  }
}
