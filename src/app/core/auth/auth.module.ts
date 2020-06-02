import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { combineLatest, from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  pluck,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';

const EMPTY_AUTH_ERR_MESS = 'Unknown authorization error. Please try later';

@NgModule({
  imports: [MatSnackBarModule, RouterModule.forChild([])],
})
export class AuthModule {
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
      switchMap((token: string) => authService.setToken(token))
    );

    combineLatest([tokenParams$, errorParams$])
      .pipe(
        catchError((err) => of(null)),
        take(1),
        switchMap(() => from(router.navigate(['/'])))
      )
      .subscribe();
  }
}
