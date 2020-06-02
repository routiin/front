import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login.routing.module';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class LoginModule {}
