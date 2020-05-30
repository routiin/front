import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const ICONS = ['today', 'feed', 'progress', 'add', 'profile'];
const ICONS_PATH = 'assets/icons/';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    ICONS.forEach((name) => {
      iconRegistry.addSvgIcon(
        name,
        sanitizer.bypassSecurityTrustResourceUrl(`${ICONS_PATH}${name}.svg`)
      );
    });
  }
}
