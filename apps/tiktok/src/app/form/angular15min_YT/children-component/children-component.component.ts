import { Component, output } from '@angular/core';

@Component({
  selector: 'app-children-component',
  imports: [],
  // templateUrl: './children-component.component.html',
  template: `<p (click)="yes.emit('педеаем строку вверх')">Yes</p>`,
  styleUrl: './children-component.component.scss',
})
export class ChildrenComponentComponent {
  yes = output<string>();
}
