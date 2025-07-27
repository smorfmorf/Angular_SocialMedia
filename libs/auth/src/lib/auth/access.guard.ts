import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

// Защитник маршрутов проверяет залогинился пользователь или нет.
export function canActivateAuth() {
  const isAuth = inject(AuthService).isAuth;

  // если все ок
  if (isAuth) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
}
