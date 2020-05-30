import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
