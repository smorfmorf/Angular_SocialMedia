import { Profile } from '@tt/interfaces/profile';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProfileService } from '../../../../profile/src/lib/services/profile.service';
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
  updateAt: string;

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

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.baseApiUrl}chat/${userId}`, {});
  }

  getMyChats() {
    return this.http.get<myChat[]>(`${this.baseApiUrl}chat/get_my_chats/`);
  }

  //! можно такой вариант использовать типо получить сообщения из конкретного чата, добавить поля в него, завести global state и его отрендерить.
  // activeChatMessage = signal<Message[]>([]);

  // getChatById(chatId: number) {
  //   return this.http.get<Chat>(`${this.baseApiUrl}chat/${chatId}`).pipe(
  //     map((chat) => {
  //       const patchMessages = chat.messages.map((message) => {
  //         return {
  //           ...message,
  //           user:
  //             chat.userFirst.id === message.userFromId
  //               ? chat.userFirst
  //               : chat.userSecond,
  //           isMyMessage: message.userFromId === this.me()!.id,
  //         };
  //       });
  //       this.activeChatMessage.set(patchMessages);

  //       return {
  //         ...chat,
  //         messages: patchMessages,
  //       };
  //     })
  //   );
  // }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.baseApiUrl}chat/${chatId}`).pipe(
      map((chat) => {
        return {
          ...chat,
          messages: chat.messages.map((message) => {
            return {
              ...message,
              user:
                chat.userFirst.id === message.userFromId
                  ? chat.userFirst
                  : chat.userSecond,
              isMyMessage: message.userFromId === this.me()!.id,
            };
          }),
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
