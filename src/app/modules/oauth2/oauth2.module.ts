import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/auth.service';

@NgModule()
export class Oauth2Module {
  constructor(route: ActivatedRoute, authService: AuthService, router: Router) {
    route.queryParams.pipe(take(1), pluck('token')).subscribe((token) => {
      if (!token) {
        router.navigate(['/login']);
        return;
      }

      authService.setToken(token);
      router.navigate(['/today']);
    });
  }
}
