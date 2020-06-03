import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule, MatButtonModule],
})
export class ProfileModule {}
