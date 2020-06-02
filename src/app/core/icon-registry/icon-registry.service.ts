import { Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { IconRegistryConfig } from './icon-registry.interface';
import { ICON_REGISTRY_CONFIG } from './icon-registry.token';

const DEFAULT_REGISTRY_CONFIG: IconRegistryConfig = {
  icons: [],
  iconsFolderPath: '/assets/icons',
};

@Injectable()
export class IconRegistryService {
  constructor(
    @Inject(ICON_REGISTRY_CONFIG) private _config: IconRegistryConfig,
    public iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    const config = { ...DEFAULT_REGISTRY_CONFIG, ...this._config };
    const { icons, iconsFolderPath } = config;

    icons.forEach((name) => {
      this.iconRegistry.addSvgIcon(
        name,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          `${iconsFolderPath}/${name}.svg`
        )
      );
    });
  }
}
