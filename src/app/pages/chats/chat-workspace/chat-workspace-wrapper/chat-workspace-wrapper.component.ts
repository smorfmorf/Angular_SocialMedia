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
import { MessageInputComponent } from '../../../../ui/message-input/message-input.component';
import {
  Chat,
  ChatsService,
  Message,
} from '../../../../services/chats.service';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-wrapper',
  imports: [ChatMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-wrapper.component.html',
  styleUrl: './chat-workspace-wrapper.component.scss',
})
export class ChatWorkspaceWrapperComponent {
  chatService = inject(ChatsService);
  chat = input.required<Chat>();

  messages = signal<Message[]>([]);
  constructor() {
    effect(() => {
      console.log(this.chat().messages);
      this.messages.set(this.chat().messages);
    });
  }

  async onSendMessage(message: string) {
    await firstValueFrom(this.chatService.sendMessage(this.chat().id, message));

    firstValueFrom(this.chatService.getChatById(this.chat().id)).then(
      (chat) => {
        console.log('chat: ', chat);
        this.messages.set(chat.messages);
        console.log('messages: ', this.messages());
      }
    );
  }

  render2 = inject(Renderer2);
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
