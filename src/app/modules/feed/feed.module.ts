import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FeedComponent } from './feed.component';
import { FeedRoutingModule } from './feed.routing.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [CommonModule, SharedModule, FeedRoutingModule],
})
export class FeedModule {}
