import { NgModule } from '@angular/core';
import { CardModule } from '../components/card/card.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { HeaderModule } from '../components/header/header.module';

@NgModule({
  exports: [HeaderModule, ToolbarModule, CardModule],
})
export class SharedModule {}
