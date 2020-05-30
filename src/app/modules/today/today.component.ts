import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodayComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
