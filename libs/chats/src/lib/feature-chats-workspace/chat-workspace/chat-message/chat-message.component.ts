import { DateTimePipe } from './../../../../../../common-ui/src/lib/pipe/date-time.pipe';
import { Component, HostBinding, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarComponent } from '@tt/common-ui';
import { Message } from '../../../services/chats.service';

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
    console.log('getter');
    return this.message().isMyMessage;
  }
}
