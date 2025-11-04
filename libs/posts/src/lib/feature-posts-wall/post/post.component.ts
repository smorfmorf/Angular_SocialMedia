import { svg } from '../../../../../common-ui/src/lib/components/svg/svg.component';
import { AvatarComponent } from '../../../../../common-ui/src/lib/components/avatar/avatar.component';
import {
  Component,
  inject,
  input,
  signal,
  effect,
  OnInit,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { CommentComponent } from '../../ui/comment/comment.component';
import {
  Post,
  PostComment,
  PostService,
} from '../../../../../data-acsses/src/lib/posts/post.service';
import { TestDirective } from '../post-list/test.derictive';

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

  // postService = inject(PostService);

  constructor(private postService: PostService) {
    console.log('time: ', this.postService.time);
  }

  directive = inject(TestDirective);



  post = input<Post>();
  comments = signal<PostComment[]>([]);

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
