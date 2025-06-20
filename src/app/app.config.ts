import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authToken_Interceptor } from './services/auth.middleWare';

// регистрация конфигурация приложения
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // подключаем HttpClient тк поумолчанию его нет. + добавляем interceptor
    provideHttpClient(withInterceptors([authToken_Interceptor])),
  ],
};
//provide - то что отдаем что такие модули есть, inject - запросить чтото чтобы выводить (забрать/получить)
