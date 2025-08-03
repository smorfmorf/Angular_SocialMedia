import { ProfileService } from '@tt/data-acsses';
import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from 'libs/common-ui/src/lib/components/avatar/avatar.component';
import { svg } from 'libs/common-ui/src/lib/components/svg/svg.component';
import { PostService } from '../../../../../data-acsses/src/lib/posts/post.service';

@Component({
  selector: 'app-post-input',
  imports: [AvatarComponent, CommonModule, svg, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  profile = inject(ProfileService).myAccount;
  // profile = inject(GlobalStoreService).myAccount;

  postService = inject(PostService);
  isCommentInput = input<boolean>(false);
  postId = input<number>(0);

  postText = '';

  //! в Angular стили меняем через render (зачем она нужна - тк ангуляр можно сконвертнуть под мобилку, desktop, терменал-оплаты и там может быть не браузер а доступ к другим элементам)
  render = inject(Renderer2);
  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.render.setStyle(textarea, 'height', 'auto');
    this.render.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  @Output() created = new EventEmitter();

  onCreatePost() {
    if (!this.postText) return;

    if (this.isCommentInput()) {
      firstValueFrom(
        this.postService.createComments({
          text: this.postText,
          authorId: this.profile()!.id,
          postId: this.postId(),
        })
      ).then(() => {
        this.postText = '';
        this.created.emit();
      });

      return;
    }
    firstValueFrom(
      this.postService.createPost({
        title: 'Новый пост',
        content: this.postText,
        authorId: this.profile()!.id,
      })
    ).then(() => (this.postText = ''));
  }

  // onSend() {
  //   if (this.postText.trim()) {
  //     this.created.emit(this.postText);
  //     this.postText = '';
  //   }
  // }
}
