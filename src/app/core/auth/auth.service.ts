import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _router: Router, private _http: HttpClient) {}

  setToken(token: string): void {
    this._http.get('https://api.routiin.ru/v1/user/me').subscribe(
      (response) => {
        console.log('response', response);
        localStorage.setItem('token', `${token}`);
      },
      (error) => {
        console.log('error', error);
        this._router.navigate(['/']);
      }
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
}
