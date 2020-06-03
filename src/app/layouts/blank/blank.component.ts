import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {}
