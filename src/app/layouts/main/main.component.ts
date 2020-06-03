import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
