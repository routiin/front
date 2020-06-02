import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  constructor(private _authService: AuthService) {}

  logout() {
    this._authService.removeToken();
  }
}
