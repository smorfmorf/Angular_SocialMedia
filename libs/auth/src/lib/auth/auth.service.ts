import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cookieService = inject(CookieService);
  http = inject(HttpClient);
  router = inject(Router);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  token: string | null = null;
  refresh_token: string | null = null;

  // авторизирован пользователь или нет
  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }
    return Boolean(this.token);
  }

  login(body: { username: string; password: string }) {
    const formData = new FormData();
    formData.append('username', body.username);
    formData.append('password', body.password);

    console.log('Отправил');
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}auth/token`, formData)
      .pipe(
        tap((val) => {
          this.token = val.access_token;
          this.refresh_token = val.refresh_token;
          this.cookieService.set('token', this.token);
          this.cookieService.set('refresh_token', this.refresh_token);
        })
      );
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}auth/refresh`, {
        refresh_token: this.refresh_token,
      })
      .pipe(
        tap((val) => {
          this.token = val.access_token;
          this.refresh_token = val.refresh_token;
          this.cookieService.set('token', this.token);
          this.cookieService.set('refresh_token', this.refresh_token);
        }),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('refresh_token');
    this.token = null;
    this.refresh_token = null;
    this.router.createUrlTree(['/login']);
  }
}
