import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { from, race } from 'rxjs';
import { filter, pluck, switchMap, tap, map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

const EMPTY_AUTH_ERR_MESS = 'Unknown authorization error. Please try later';

@NgModule({
  imports: [MatSnackBarModule, RouterModule.forChild([])],
})
export class Oauth2Module {
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
