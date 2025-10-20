import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-nbdk26l4pp47g20i.us.auth0.com', 
      clientId: 'gg6m1hoLn8Dfmu6PZJbQKfnUrd6t6DXZ', 
      authorizationParams: {
        redirect_uri: window.location.origin + '/callback', 
        scope: 'openid profile email'
      }
    })
  ]
};