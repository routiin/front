import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { APP_ICONS } from './constants/icons';
import { IconRegistryModule } from './core/icon-registry/icon-registry.module';
import { BlankLayoutComponent } from './layouts/blank/blank.component';
import { MainLayoutComponent } from './layouts/main/main.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, BlankLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    IconRegistryModule.forRoot({ icons: APP_ICONS }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
