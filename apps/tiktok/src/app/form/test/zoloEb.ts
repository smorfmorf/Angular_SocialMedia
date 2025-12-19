// app.component.ts
import { Component, signal } from '@angular/core';
import { ChildComponent } from './child-component';

@Component({
  selector: 'zoloEb-root',
  imports: [ChildComponent], // Добавьте ChildComponent здесь
  template: `
    <h1>Сигналы в Angular Demo</h1>
    <button (click)="increment()">Изменить сигнал</button>
    <p>Root signal: {{ count() }}</p>

    <child-component [count]="count"></child-component>
  `,
})
export class ZoloEb {
  count = signal(0);
  constructor() {
    console.log('AppComponent');
  }

  increment() {
    console.log('AppComponent: сигнал изменился');
    this.count.set(this.count() + 1);
  }
}
