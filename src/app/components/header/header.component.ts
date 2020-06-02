import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from 'src/app/core/auth/auth.service';
import { environment } from 'src/environments/environment';

interface UserMeResponse {
  countOfRoutiins: number;
  firstName: string;
  followers: number;
  id: number;
  imageUrl: string;
  lastName: string;
  login: string;
  score: number;
}

@Component({
  selector: 'rtn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  imageUrl$: Observable<string>;

  constructor(private _http: HttpClient, private _authService: AuthService) {}

  ngOnInit() {
    if (this._authService.isUserLoggedIn()) {
      this.imageUrl$ = this._http
        .get<UserMeResponse>(environment.api.getUserURI)
        .pipe(map((response) => response.imageUrl));
    }
  }
}
