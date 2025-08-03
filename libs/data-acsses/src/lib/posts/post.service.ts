import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { Profile } from '../profile/profile.service';

export interface PostCreateDto {
  title: string;
  content: string;
  authorId: number;
}

export interface PostComment {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
    subscribersAmount: number;
  };
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: Profile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: PostComment[];
}

export interface CommmentCreateDto {
  text: string;
  authorId: number;
  postId: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  //global state:
  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      // создали пост и перезагрузили посты
      switchMap((res) => {
        return this.fetchPosts();
      })
    );
  }

  fetchPosts() {
    return this.http.get<Post[]>(`${this.baseApiUrl}post/`).pipe(
      tap((res) => {
        this.posts.set(res);
      })
    );
  }

  // комент коменту - можно добавить
  createComments(payload: CommmentCreateDto) {
    return this.http.post<PostComment>(`${this.baseApiUrl}comment/`, payload);
  }

  getCommentsByPostId(postId: number) {
    return this.http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
