import { Injectable } from '@angular/core';

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
  setToken(token: string): void {
    localStorage.setItem('token', `${token}`);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
