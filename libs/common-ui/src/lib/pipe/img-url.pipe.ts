import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  // value параметр который передается в pipe " Этот параметр летит в | пайп "
  transform(value: string | null): string | null {
    if (value) {
      return `https://icherniakov.ru/yt-course/${value}`;
    }

    return null;
  }
}
