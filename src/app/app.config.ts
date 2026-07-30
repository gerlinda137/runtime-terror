import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { messageInterceptor } from './core/interceptors/massage.interceptor';
import { healthInterceptor } from './core/interceptors/healthInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [
          authInterceptor,
          healthInterceptor,
          messageInterceptor
        ]
      )
    ),
  ],
};
