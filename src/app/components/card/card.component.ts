import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardBase } from './base/card-base';

@Component({
  selector: 'rtn-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: {
    class: 'rtn-card',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent extends CardBase implements OnInit, OnDestroy {
  @Input() breakpointsX = [-140, -120, 0, 120, 140];

  @ViewChild(CdkDrag) private _source: CdkDrag;

  private _destroyer = new Subject<void>();

  ngOnInit() {
    this.end$
      .pipe(takeUntil(this._destroyer))
      .subscribe((positionX) =>
        this._source._dragRef.setFreeDragPosition({ x: positionX, y: 0 })
      );

    this.reset$
      .pipe(takeUntil(this._destroyer))
      .subscribe(() => this._source._dragRef.reset());
  }

  ngOnDestroy() {
    this._destroyer.next();
    this._destroyer.complete();
  }
}
