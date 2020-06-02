import { NgModule } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  RoutesRecognized,
  RouterEvent,
} from '@angular/router';
import { pluck, take, filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';

@NgModule()
export class Oauth2Module {
  constructor(route: ActivatedRoute, authService: AuthService, router: Router) {
    router.events
      .pipe(
        filter((event) => event instanceof RoutesRecognized),
        take(1)
      )
      .subscribe((event) => {
        if (event instanceof RoutesRecognized) {
          const token = event.url.split('token=')[1];
          const error = event.url.split('error=')[1];

          if (!token) {
            router.navigate(['/login'], { state: { error } });
            return;
          }

          authService.setToken(token);
          router.navigate(['/today']);
        }
      });
  }
}
