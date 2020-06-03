import { InjectionToken } from '@angular/core';
import { IconRegistryConfig } from './icon-registry.interface';

export const ICON_REGISTRY_CONFIG = new InjectionToken<IconRegistryConfig>(
  'ICON_REGISTRY_CONFIG'
);
