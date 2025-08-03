import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  Renderer2,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../../../../../common-ui/src/lib/components/avatar/avatar.component';
import { ProfileService } from '../../../../../data-acsses/src/lib/profile/profile.service';
import { svg } from '@tt/common-ui';

@Component({
  selector: 'app-message-input',
  imports: [AvatarComponent, CommonModule, svg, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  postText = '';
  render = inject(Renderer2);
  @Output() created = new EventEmitter();

  profile = inject(ProfileService).myAccount;

  onTextAreaInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.render.setStyle(textarea, 'height', 'auto');
    this.render.setStyle(textarea, 'height', textarea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }
}
