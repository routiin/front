import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iif, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { pluck, switchMap, take } from 'rxjs/operators';

const HOST = 'https://api.routiin.ru';

// prettier-ignore
const SOCIAL_LOGIN_URI = {
  facebook : `${HOST}/oauth2/authorize/facebook`,
  google   : `${HOST}/oauth2/authorize/google`,
} as const;

type SocialLoginNameType = keyof typeof SOCIAL_LOGIN_URI;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient, private _route: ActivatedRoute) {}

  loginFacebook(): Observable<boolean> {
    return this._oauth2Login('facebook');
  }

  loginGoogle(): Observable<boolean> {
    return this._oauth2Login('google');
  }

  private _oauth2Login(name: SocialLoginNameType): Observable<boolean> {
    return this._http
      .get(SOCIAL_LOGIN_URI[name], {
        params: {
          redirect_uri: 'https://api.routiin.ru/oauth2',
        },
        withCredentials: true,
      })
      .pipe(
        switchMap(() => this._route.params.pipe(take(1), pluck('token'))),
        switchMap((token: string) =>
          iif(
            () => !!token,
            of(true).pipe(tap(() => localStorage.setItem('token', `${token}`))),
            of(false)
          )
        )
      );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
