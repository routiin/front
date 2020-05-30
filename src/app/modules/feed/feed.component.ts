import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
