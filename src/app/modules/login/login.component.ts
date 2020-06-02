import { ChangeDetectionStrategy, Component } from '@angular/core';

const AUTH_URI = 'https://api.routiin.ru/oauth2/authorize/';
const REDIRECT_URI = 'https://routiin.ru/auth';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  fbAuthHref = `${AUTH_URI}/facebook?redirect_uri=${REDIRECT_URI}`;
  googleAuthHref = `${AUTH_URI}/google?redirect_uri=${REDIRECT_URI}`;
}
