import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './app/auth/auth.interceptor';
import { loadingInterceptor } from './app/shared/interceptors/loading.interceptor';

// registerLocaleData(en);

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    provideHttpClient(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
  ],
}).catch((err) => console.error(err));
