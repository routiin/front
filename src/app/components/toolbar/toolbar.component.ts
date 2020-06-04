import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rtn-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  icons: { [name: string]: string } = {
    today: 'track_changes',
    feed: 'visibility',
    add: 'control_point',
    progress: 'bar_chart',
    profile: 'face',
  };

  get buttons() {
    return Object.keys(this.icons);
  }
}
