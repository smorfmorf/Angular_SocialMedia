import { ChatWsMessage } from './chat-webSocket-interface';
import { webSocket } from 'rxjs/webSocket';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import {
  ChatConnectionWSParams,
  ChatWsService,
} from './chat-webSocket-service';
import { finalize, Observable, tap } from 'rxjs';

export class ChatWsRxJsService implements ChatWsService {
  private socket: WebSocketSubject<ChatWsMessage> | null = null;

  connect(params: ChatConnectionWSParams): Observable<ChatWsMessage> {
    if (!this.socket) {
      this.socket = webSocket({
        url: params.url,
        protocol: [params.token],
      });
    }

    // делаем WebSocket, паймим его и вконце нужно подписаться и желательно отписаться (где вызываем его)
    return this.socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() => {
        console.log('Вызывается при закрытии соеднинения');
      })
    );
  }

  // не pipe, а next тк в Subject отправляем с Next
  sendMessage(text: string, chatId: number) {
    this.socket?.next({
      text,
      chat_id: chatId,
    });
  }
  disconnect() {
    this.socket?.complete();
  }
}
