import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodayComponent } from './today.component';
import { TodayRoutingModule } from './today.routing.module';

@NgModule({
  declarations: [TodayComponent],
  imports: [CommonModule, SharedModule, TodayRoutingModule],
})
export class TodayModule {}
