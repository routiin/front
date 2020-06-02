import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, pluck, map, tap, take, switchMap } from 'rxjs/operators';
import { race, from } from 'rxjs';

const AUTH_URI = 'https://api.routiin.ru/oauth2/authorize/';
const REDIRECT_URI = 'https://routiin.ru/login';

const EMPTY_AUTH_ERR_MESS = 'Unknown authorization error. Please try later';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fbAuthHref = `${AUTH_URI}/facebook?redirect_uri=${REDIRECT_URI}`;
  googleAuthHref = `${AUTH_URI}/google?redirect_uri=${REDIRECT_URI}`;

  constructor(
    router: Router,
    route: ActivatedRoute,
    authService: AuthService,
    snackBar: MatSnackBar,
    sanitizer: DomSanitizer
  ) {
    const errorParams$ = route.queryParams.pipe(
      filter((params) => params.hasOwnProperty('error')),
      pluck('error'),
      map((error) => sanitizer.sanitize(0, error) || EMPTY_AUTH_ERR_MESS),
      tap((error) => snackBar.open(error, 'OK'))
    );

    const tokenParams$ = route.queryParams.pipe(
      filter((params) => params.hasOwnProperty('token')),
      pluck('token'),
      tap((token: string) => authService.setToken(token))
    );

    race([tokenParams$, errorParams$])
      .pipe(
        take(1),
        switchMap(() => from(router.navigate(['/'])))
      )
      .subscribe();
  }
}
