import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { DateTime } from 'luxon';
import {
  Chat,
  ChatsService,
  Message,
} from '../../../../../../data-acsses/src/lib/chats/chats.service';
import { MessageInputComponent } from '../../../ui/message-input/message-input.component';

export interface GroupDate {
  date: string;
  messages: Message[];
}

@Component({
  selector: 'app-chat-workspace-wrapper',
  imports: [ChatMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-wrapper.component.html',
  styleUrl: './chat-workspace-wrapper.component.scss',
})
export class ChatWorkspaceWrapperComponent {
  chatService = inject(ChatsService);
  chat = input.required<Chat>();
  hostElement = inject(ElementRef);

  messages = inject(ChatsService).activeChatMessage;
  // messages = signal<Message[]>([]);
  dateGroup = signal<GroupDate[]>([]);

  // при переходе на другой чат сбрасываем сообщения
  constructor() {
    effect(() => {
      console.log(this.chat().messages);
      // this.messages.set(this.chat().messages);
      this.dateGroup.set(this.groupByDate(this.messages()));
      console.log('dateGroup: ', this.dateGroup());
    });
  }

  groupByDate(originalArr: Message[]) {
    const groupByDate = {} as any;

    originalArr.forEach((message) => {
      // const dateKey = new Date(message.createdAt).toISOString().split('T')[0];
      const local = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const isoString = message.createdAt.replace(' ', 'T');
      const dt = DateTime.fromISO(isoString, { zone: 'utc' })
        .setZone(local)
        .toFormat('dd.MM.yyyy HH:mm')
        .split(' ')[0]; // или 'Asia/Srednekolymsk' — ближе к Хабаровску

      if (!groupByDate[dt]) {
        groupByDate[dt] = {
          date: dt,
          messages: [message],
        };
      } else {
        groupByDate[dt].messages.push(message);
      }
    });

    const res = Object.values(groupByDate);

    return res as GroupDate[];
  }

  async onSendMessage(message: string) {
    console.log('message: ', message);
    this.chatService.wsAdapter.sendMessage(message, this.chat().id);

    //! если используем с вариантом activeChatMessage(все сообщение чата из сервиса) тогда это в комент
    // await firstValueFrom(this.chatService.getChatById(this.chat().id));
    // await firstValueFrom(this.chatService.sendMessage(this.chat().id, message));
    // .firstValueFrom(this.chatService.getChatById(this.chat().id));
    // .then((chat) => {
    //   console.log('chat: ', chat);
    //   this.messages.set(chat.messages);
    //   this.dateGroup.set(this.groupByDate(this.messages()));
    // });
  }

  render2 = inject(Renderer2);
  // декоратор который позволяет получить ссылку на элемент шаблона
  @ViewChild('wrapper') wrapper!: ElementRef;

  ngAfterViewInit(): void {
    console.log('wrapper: ', this.wrapper);

    this.resizedList();

    fromEvent(window, 'resize')
      .pipe(debounceTime(30))
      .subscribe(() => {
        console.log('resize');
        this.resizedList();
      });
  }

  resizedList() {
    const { top } = this.wrapper.nativeElement.getBoundingClientRect();
    console.log('top: ', top);
    const height = window.innerHeight - top - 128;
    this.render2.setStyle(this.wrapper.nativeElement, 'height', `${height}px`);
  }
}
