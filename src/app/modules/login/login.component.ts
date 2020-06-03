import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  authFbURI = environment.api.authFbURI;
  authGoogleURI = environment.api.authGoogleURI;
}
