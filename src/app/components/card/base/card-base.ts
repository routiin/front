import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs/internal/Subject';

export class CardBase {
  get isShownLeftSide() {
    return this.currentPositionX >= 0 && this._endPositionX >= 0;
  }

  get isShownRightSide() {
    return this.currentPositionX <= 0 && this._endPositionX <= 0;
  }

  get backSideStyle() {
    return {
      left: this.isShownLeftSide ? 0 : 'unset',
      right: this.isShownRightSide ? 0 : 'unset',
      width: Math.abs(this.currentPositionX) + 'px',
    };
  }

  breakpointsX: number[];

  isAnimation: boolean;

  private _startPositionX = 0;
  private _endPositionX = 0;
  currentPositionX = 0;

  private _endSubject = new Subject<number>();
  end$ = this._endSubject.asObservable();

  private _resetSubject = new Subject<void>();
  reset$ = this._resetSubject.asObservable();

  static getClosestPoint(breakPoints: number[], point: number): number {
    if (!breakPoints.length) {
      return point;
    }

    const lastIndex = breakPoints.length - 1;

    let prevDistance = Infinity;
    let prevPoint = 0;

    for (let i = 0; i <= lastIndex; i++) {
      /**
       * Массив брейкпоинтов всегда упорядочен от меньшего к большему.
       * Если точка положительная идем справа налево, чтобы возвращать большее число.
       * Если точка меньше ноля - слева направо, чтобы возвращать меньшее.
       */
      const index = point >= 0 ? lastIndex - i : i;
      const currentNumber = breakPoints[index];

      const currentDistance = Math.abs(point - currentNumber);

      if (currentDistance >= prevDistance) {
        return prevPoint;
      }

      prevDistance = currentDistance;
      prevPoint = currentNumber;
    }

    return prevPoint;
  }

  static isLast(point: number, points: number[]): boolean {
    return point === points[points.length - 1];
  }

  static isFirst(point: number, points: number[]): boolean {
    return point === points[0];
  }

  started(): void {
    console.log('started');
    this.isAnimation = false;
    this._endPositionX = 0;
  }

  moved(event: CdkDragMove): void {
    this.currentPositionX = this._startPositionX + event.distance.x;
  }

  ended(): void {
    this.isAnimation = true;

    this._endPositionX = this.currentPositionX;

    this.currentPositionX = CardBase.getClosestPoint(
      this.breakpointsX,
      this.currentPositionX
    );

    if (
      CardBase.isFirst(this.currentPositionX, this.breakpointsX) ||
      CardBase.isLast(this.currentPositionX, this.breakpointsX)
    ) {
      this._reset();
      return;
    }

    this._startPositionX = this.currentPositionX;

    this._endSubject.next(this._startPositionX);
  }

  private _reset(): void {
    this._startPositionX = 0;
    this.currentPositionX = 0;

    this._resetSubject.next();
  }
}
