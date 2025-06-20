import {
  Component,
  inject,
  input,
  signal,
  effect,
  OnInit,
} from '@angular/core';
import { Post, PostComment, PostService } from '../../../services/post.service';
import { AvatarComponent } from '../../../ui/avatar/avatar.component';
import { DatePipe } from '@angular/common';
import { svg } from '../../../ui/svg/svg.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-post',
  imports: [
    AvatarComponent,
    DatePipe,
    svg,
    PostInputComponent,
    CommonModule,
    CommentComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  post = input<Post>();
  comments = signal<PostComment[]>([]);
  postService = inject(PostService);

  ngOnInit() {
    this.comments.set(this.post()!.comments);
  }

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    this.comments.set(comments);
  }
}
