import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
  transform(value: string): string | null {
    if (value) {
      const date = new Date(value);
      const now = Date.now();
      const timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // смещение часового пояса в миллисекундах
      const difference = Math.floor(
        (now - date.getTime() + timezoneOffset) / 1000
      ); //время в секундах
      if (difference < 60) return 'только что';
      if (difference < 3600) return `${Math.floor(difference / 60)} мин назад`;
      if (difference < 86400) return `${Math.floor(difference / 3600)} ч назад`;
      if (difference < 604800)
        return `${Math.floor(difference / 86400)} дн назад`;

      return date.toLocaleDateString('ru-RU');
    }
    return null;
  }
}
