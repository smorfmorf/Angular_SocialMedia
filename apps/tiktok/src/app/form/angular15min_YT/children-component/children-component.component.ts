import { Component, EventEmitter, Output, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-children-component',
  imports: [FormsModule],
  // templateUrl: './children-component.component.html',
  template: ` <input [(ngModel)]="userName" />
    <button (click)="sendData($event)">Бросок данных вверх</button>
    <br />
    <button (click)="yes.emit('педеаем строку вверх')">
      Перелаем yes вверх
    </button>`,
})
export class ChildrenComponentComponent {
  yes = output<string>();

  userName = signal('');

  //!бросок данных родителю (Emit, генерирует событие, родитель подписывается)
  @Output() TestEmitAngular = new EventEmitter<any>();

  sendData(event: any) {
    this.TestEmitAngular.emit(`(✅ типо $emit - во Vue) ${this.userName()}`);
  }
}
