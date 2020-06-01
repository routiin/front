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

  init(): Observable<boolean> {
    return this._route.params.pipe(
      take(1),
      pluck('token'),
      switchMap((token: string) =>
        iif(
          () => !!token,
          of(true).pipe(tap(() => localStorage.setItem('token', `${token}`))),
          of(false)
        )
      )
    );
  }

  loginFacebook(): Observable<boolean> {
    return this._oauth2Login('facebook');
  }

  loginGoogle(): Observable<boolean> {
    return this._oauth2Login('google');
  }

  private _oauth2Login(name: SocialLoginNameType): Observable<boolean> {
    return of(true);
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
