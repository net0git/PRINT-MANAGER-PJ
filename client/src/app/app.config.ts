import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './infrastructure/core/interceptors/auth.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
     provideEnvironmentNgxMask(),
    provideHttpClient(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ],
    
};
