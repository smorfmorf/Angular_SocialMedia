import {
  ChatWsMessage,
  ChatWSUndreadMessage,
} from './chat-webSocket-interface';

//! Функция условия которая сужает тип (определяем точно и надежно) БЛЯТЬ ПРОСТО УСЛОВИЯ ХУЙ ЗНАЕТ ЗАЧЕМ ОНО НАДО
export function isUnreadMessage(
  message: ChatWsMessage
): message is ChatWSUndreadMessage {
  return 'action' in message && message.action === 'unread';
}
