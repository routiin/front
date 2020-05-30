import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
