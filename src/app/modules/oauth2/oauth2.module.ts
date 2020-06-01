import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { pluck, take, filter, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';

@NgModule()
export class Oauth2Module {
  constructor(route: ActivatedRoute, authService: AuthService, router: Router) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => route.queryParams.pipe(take(1), pluck('token')))
      )
      .subscribe((token) => {
        console.log('token', token);

        if (!token) {
          router.navigate(['/login']);
          return;
        }

        authService.setToken(token);
        router.navigate(['/today']);
      });
  }
}
