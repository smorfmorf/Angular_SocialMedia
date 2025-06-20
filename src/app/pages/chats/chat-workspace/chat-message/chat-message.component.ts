import { Component, HostBinding, input } from '@angular/core';
import { Message } from '../../../../services/chats.service';
import { AvatarComponent } from '../../../../ui/avatar/avatar.component';
import { DatePipe } from '@angular/common';
import { DateTimePipe } from '../../../../pipe/date-time.pipe';

@Component({
  selector: 'app-chat-message',
  imports: [AvatarComponent, DatePipe, DateTimePipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.isMyMessage')
  get isMyMessage() {
    return this.message().isMyMessage;
  }
}
