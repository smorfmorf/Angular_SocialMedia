// child.component.ts
import { Component, Input, signal, effect } from '@angular/core';
import { Angular15minComponent } from '../angular15min_YT/angular15min.component';

@Component({
  imports: [Angular15minComponent],
  selector: 'child-component',
  template: `<app-angular15min />
    <p>Child component sees signal: {{ count() }}</p> `,
})
export class ChildComponent {
  @Input() count!: any;

  constructor() {
    effect(() => {
      console.log('ChildComponent: сигнал изменился на', this.count?.());
    });
  }
}
