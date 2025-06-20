import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// Защитник маршрутов проверяет залогинился пользователь или нет.
export function canActivateAuth() {
  const isAuth = inject(AuthService).isAuth;

  // если все ок
  if (isAuth) {
    return true;
  }

  return inject(Router).createUrlTree(['/login']);
}
