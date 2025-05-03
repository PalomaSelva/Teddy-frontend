import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideEnvironmentNgxMask(),
    provideNgxMask(),
    importProvidersFrom(NgxSpinnerModule.forRoot(/*config*/)),
    provideAnimationsAsync(),
  ],
};
