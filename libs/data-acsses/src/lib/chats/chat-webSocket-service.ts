export interface ChatWsService {
  // создать канал, метод для отпраки сообщений и дисконект
  connect: (params: ChatConnectionWSParams) => void;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
export interface ChatConnectionWSParams {
  url: string;
  token: string;
  handleMessage(message: string): void;
}

export class ChatWsNativeService implements ChatWsService {
  private socket: WebSocket | null = null;

  connect(params: ChatConnectionWSParams): void {
    if (this.socket) {
      return;
    }
    // массив с авторизационной инфой
    // this.socket = new WebSocket('ws://localhost:3000', ['authToken']);
    this.socket = new WebSocket(params.url, [params.token]);

    this.socket.onmessage = (event: MessageEvent) => {
      //* Обработка сообщений event.data
      params.handleMessage(JSON.parse(event.data));
    };

    this.socket.onclose = () => {
      console.log('Закрыли соединение');
    };
  }
  sendMessage(text: string, chatId: number): void {
    // отправляем / принимаем - строки а не JSON
    this.socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId,
      })
    );
  }
  disconnect(): void {
    this.socket?.close();
  }
}
