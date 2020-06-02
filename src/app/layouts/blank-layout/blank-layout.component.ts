import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {}
