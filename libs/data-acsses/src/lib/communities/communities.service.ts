import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface AdminCommunity {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: 0;
  firstName: string;
  lastName: string;
  isActive: true;
  stack: string[];
  city: string | null;
  description: string;
}

export interface Community {
  id: number;
  name: string;
  themes: string[];
  tags: string[];
  bannerUrl: string | null;
  avatarUrl: string | null;

  description: string;
  subscribersAmount: number;
  createdAt: string;
  isJoined: boolean;
  admin: AdminCommunity;
}

export interface CommunityState {
  items: Community[];
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  //global state:
  comunities = signal<Community[]>([]);

  getCommunities() {
    return this.http.get<CommunityState>(`${this.baseApiUrl}community/`, {
      params: {
        page: 1,
        size: 50,
      },
    }).pipe(
      tap(
        (res) => {
          this.comunities.set(res.items);
        }
      )
    )
  }
}
