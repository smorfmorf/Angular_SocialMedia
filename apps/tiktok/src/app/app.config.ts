import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authToken_Interceptor } from '@tt/auth';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// регистрация конфигурация приложения
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // подключаем HttpClient тк поумолчанию его нет. + добавляем interceptor
    provideHttpClient(withInterceptors([authToken_Interceptor])),
    // подключаем Store + Effect
    provideStore(),
    provideEffects(),
  ],
};
//provide - то что отдаем "говорим какие модули есть", inject - запросить чтото чтобы выводить (забрать/получить)
