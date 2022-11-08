import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {initializeApp} from "@angular/fire/app";
import {getAnalytics} from "@angular/fire/analytics";

if (environment.production) {
  enableProdMode();
}

const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
