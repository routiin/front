import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { API_SERVER_URI } from 'src/app/components/header/header.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _checkedTocken: string;

  constructor(private _router: Router, private _http: HttpClient) {}

  setToken(token: string) {
    this._checkedTocken = token;

    return this._http.get(`${API_SERVER_URI}/user/me`).pipe(
      catchError((err) => {
        localStorage.removeItem('token');
        console.log('ERROR', err);
        return throwError('');
      }),
      tap((response) => localStorage.setItem('token', token))
    );
  }

  removeToken(): void {
    this._router.navigate(['/login']);
    localStorage.removeItem('token');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCheckedTocken() {
    return this._checkedTocken;
  }
}
