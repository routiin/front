import { NgModule, ModuleWithProviders } from '@angular/core';
import { CardModule } from '../components/card/card.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { HeaderModule } from '../components/header/header.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiTokenInterceptor } from '../core/interceptors/api-token.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  exports: [HeaderModule, ToolbarModule, CardModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ApiTokenInterceptor,
          multi: true,
        },
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: { panelClass: 'rtn-snack-bar-container' },
        },
      ],
    };
  }
}
