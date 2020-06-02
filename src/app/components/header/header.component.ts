import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

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
export class HeaderComponent {
  imageUrl$ = this._http
    .get<UserMeResponse>('https://api.routtin.ru/v1/user/me')
    .pipe(map((response) => response.imageUrl));

  constructor(private _http: HttpClient) {}
}
