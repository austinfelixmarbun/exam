import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

fetch('assets/config/enviConfig.json').then(response => {
  response.json().then(config => {
    // Cache list env to storage
    localStorage.setItem('envi', JSON.stringify(config));
    platformBrowserDynamic().bootstrapModule(AppModule);
  })
}).catch(err => {
  console.log('err', err);
});