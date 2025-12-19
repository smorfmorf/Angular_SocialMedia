import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Post } from '../posts/post.service';

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

interface Community {
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

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  //global state:
  comunities = signal<Community[]>([]);

  getCommunities() {
    return this.http.get(`${this.baseApiUrl}community/`, {
      params: {
        page: 1,
        size: 50,
      },
    });
  }
}
