import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient() // Fornece o HttpClient para toda a aplicação
  ]
}).catch(err => console.error(err));