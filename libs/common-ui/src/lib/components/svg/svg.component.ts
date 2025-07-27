import { Component, Input } from '@angular/core';

@Component({
  // Angular - может вешать свои Компоненты на нативные теги
  // (все svg у которых будет props icon станут этим компонентом )
  selector: 'svg[icon]',
  template: '<svg><use [attr.href]="href"></use></svg>',
})
export class svg {
  @Input() icon = '';

  // вычисляемое свойство
  get href() {
    // имя файла + внутри svg ссылаемся на #id символа
    return `all.svg#${this.icon}`;
  }
}

//! часто делают в Angular что в 1 файл напихают svg и к ним потом обращаются по id пример: <svg icon="home"></svg>
