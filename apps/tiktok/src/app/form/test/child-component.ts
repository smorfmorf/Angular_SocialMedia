// child.component.ts
import { Component, Input, signal, effect } from '@angular/core';

@Component({
  selector: 'child-component',
  template: ` <p>Child component sees signal: {{ count() }}</p> `,
})
export class ChildComponent {
  @Input() count!: any;

  constructor() {
    // effect(() => {
    //   console.log('ChildComponent: сигнал изменился на', this.count?.());
    // });
  }
}
