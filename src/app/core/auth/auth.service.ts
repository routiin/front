import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _checkedToken: string;

  constructor(private _router: Router, private _http: HttpClient) {}

  setToken(token: string) {
    this._checkedToken = token;

    if (!environment.production) {
      localStorage.setItem('token', token);
      return of(true);
    }

    return this._http.get(environment.api.getUserURI).pipe(
      catchError((err) => {
        localStorage.removeItem('token');
        console.log('ERROR', err);
        return throwError('');
      }),
      tap((response) => localStorage.setItem('token', token))
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
