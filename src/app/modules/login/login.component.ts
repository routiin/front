import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private _authService: AuthService) {
    this._authService
      .init()
      .subscribe((isAuth) => console.log('isAuth', isAuth));
  }

  loginFacebook() {
    this._authService.loginFacebook().subscribe();
  }

  loginGoogle() {
    this._authService.loginGoogle().subscribe();
  }
}
