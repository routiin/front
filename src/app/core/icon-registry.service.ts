import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const ICONS_PATH = '/assets/icons';

const ICONS = [
  'today',
  'feed',
  'progress',
  'add',
  'profile',
  'facebook',
  'google',
];

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(
    public iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {}

  registerIcons() {
    ICONS.forEach((name) => {
      this.iconRegistry.addSvgIcon(
        name,
        this._sanitizer.bypassSecurityTrustResourceUrl(
          `${ICONS_PATH}/${name}.svg`
        )
      );
    });
  }
}
