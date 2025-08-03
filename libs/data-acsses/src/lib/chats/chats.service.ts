import { AuthService } from '../auth/auth.service';
import { ChatWsNativeService, ChatWsService } from './chat-webSocket-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, effect } from '@angular/core';
import { Profile, ProfileService } from '../profile/profile.service';
import { map, tap } from 'rxjs';

export interface myChat {
  id: number;
  userFrom: Profile;
  message: string;
  createdAt: string;
  unreadMessages: number;
}

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
}
export interface Message {
  text: string;
  id: number;
  userFromId: number;
  personalChatId: number;
  createdAt: string;
  isRead: boolean;
  updateAt?: string;

  user?: Profile;
  isMyMessage?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  me = inject(ProfileService).myAccount;
  authService = inject(AuthService);

  // патерн композиция
  wsAdapter: ChatWsService = new ChatWsNativeService();

  // Обработчик сообщения от WebSocket
  handle_WebSocket_Message(message: any) {
    console.log('message$: ', message);
    if (message.action === 'message') {
      this.activeChatMessage.set([
        ...this.activeChatMessage(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          user: this.me()!,
          isMyMessage: message.data.author === this.me()!.id,
        },
      ]);
    }

    if (message.action === 'unread') {
      console.log(`кол-во непрочитанных ${message.data.count}`);
    }
  }
  // соединение с вебсокетом
  connectWebSocket() {
    this.wsAdapter.connect({
      url: `${this.baseApiUrl}chat/ws`,
      token: this.authService.token ?? '',
      handleMessage: this.handle_WebSocket_Message.bind(this),
    });
  }

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.baseApiUrl}chat/${userId}`, {});
  }

  getMyChats() {
    return this.http.get<myChat[]>(`${this.baseApiUrl}chat/get_my_chats/`);
  }

  //! можно такой вариант использовать типо получить сообщения из конкретного чата, расширить поля в нем, завести global state и его отрендерить.
  activeChatMessage = signal<Message[]>([]);

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.baseApiUrl}chat/${chatId}`).pipe(
      map((chat) => {
        const updatedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMyMessage: message.userFromId === this.me()!.id,
          };
        });
        this.activeChatMessage.set(updatedMessages);

        return {
          ...chat,
          messages: updatedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.baseApiUrl}message/send/${chatId}`,
      {},
      {
        params: { message },
      }
    );
  }
}
