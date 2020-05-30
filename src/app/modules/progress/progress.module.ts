import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProgressComponent } from './progress.component';
import { ProgressRoutingModule } from './progress.routing.module';

@NgModule({
  declarations: [ProgressComponent],
  imports: [CommonModule, SharedModule, ProgressRoutingModule],
})
export class ProgressModule {}
