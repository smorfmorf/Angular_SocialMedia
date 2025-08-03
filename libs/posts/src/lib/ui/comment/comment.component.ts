import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarComponent } from 'libs/common-ui/src/lib/components/avatar/avatar.component';
import { PostComment } from '../../../../../data-acsses/src/lib/posts/post.service';
@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
