import { NgModule } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  ActivationEnd,
} from '@angular/router';
import { from, race } from 'rxjs';
import { filter, map, pluck, switchMap, take, tap } from 'rxjs/operators';
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
    const routerEvent$ = router.events.pipe(
      filter((event) => event instanceof ActivationEnd)
    );

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

    race([routerEvent$, tokenParams$, errorParams$])
      .pipe(
        take(1),
        switchMap(() => from(router.navigate(['/'])))
      )
      .subscribe();
  }
}
