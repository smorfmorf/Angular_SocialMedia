import { Component, input } from '@angular/core';
import { PostComment } from '../../../../services/post.service';
import { AvatarComponent } from '../../../../ui/avatar/avatar.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input<PostComment>();
}
