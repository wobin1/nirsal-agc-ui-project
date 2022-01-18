import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  // Configration Layout
  public config = {
    settings: {
      layout_type: 'ltr',
      layout_version: 'default',
      sidebar: 'default'
    }
  }

  constructor() {
    if(this.config.settings.layout_type == 'rtl')
      document.getElementsByTagName('html')[0].setAttribute('dir', this.config.settings.layout_type);
  }

}

