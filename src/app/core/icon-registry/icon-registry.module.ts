import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconRegistryConfig } from './icon-registry.interface';
import { ICON_REGISTRY_CONFIG } from './icon-registry.token';
import { IconRegistryService } from './icon-registry.service';

@NgModule({})
export class IconRegistryModule {
  constructor(iconRegistry: IconRegistryService) {
    iconRegistry.init();
  }

  static forRoot(config: IconRegistryConfig): ModuleWithProviders {
    return {
      ngModule: IconRegistryModule,
      providers: [
        IconRegistryService,
        {
          provide: ICON_REGISTRY_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
