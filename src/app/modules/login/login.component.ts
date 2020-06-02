import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const LOGIN_ERROR_MESSAGE =
  'Looks like you resigned up with google account. Please use your google account to login.';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private router: Router, private snackBar: MatSnackBar) {
    const isLoginError = (this.router.getCurrentNavigation()?.extras
      .state as any)?.error;

    if (!isLoginError) {
      this.snackBar.open(LOGIN_ERROR_MESSAGE, 'OK', {
        duration: 300000,
        panelClass: 'rtn-snack-bar-container',
      });
    }
  }
}
