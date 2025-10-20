import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import{ appConfig } from '../src/app/app.config'

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    ...appConfig.providers 
  ]
}).catch(err => console.error(err));