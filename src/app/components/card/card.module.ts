import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, MatButtonModule, DragDropModule],
  exports: [CardComponent],
})
export class CardModule {}
