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

export const API_SERVER_URI = 'https://api.routiin.ru/v1';

@Component({
  selector: 'rtn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  imageUrl$ = this._http
    .get<UserMeResponse>(`${API_SERVER_URI}/user/me`)
    .pipe(map((response) => response.imageUrl));

  constructor(private _http: HttpClient) {}
}
