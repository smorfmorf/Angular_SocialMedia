import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

export interface Profile {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}

// Pageble
export interface Subscribers {
  items: Profile[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

@Injectable({
  providedIn: 'root',
})

// тут описываем как общаемся с беком
export class ProfileService {
  // inject - запросить что-то чтобы выводить
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  myAccount = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((val) => this.myAccount.set(val)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribers(count: number) {
    return this.http
      .get<Subscribers>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(map((val) => val.items.slice(0, count)));
  }

  uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.baseApiUrl}account/upload_image`, formData);
  }

  // Partial - делает поля необязательными
  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile);
  }

  filterProfiles(params: Record<string, any>) {
    console.log('params: ', params);
    return this.http.get<Subscribers>(`${this.baseApiUrl}account/accounts`, {
      params,
    });
    // .pipe(tap((res) => this.filteredProfiles.set(res.items.slice(0, 5))));
  }
}

// всю логику забираем в стрим-http, pipe - изменяем что-то и выводим через $stream | async
