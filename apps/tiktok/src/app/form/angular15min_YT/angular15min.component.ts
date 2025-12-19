import { Component, OnDestroy, signal } from '@angular/core';
import { ChildrenComponentComponent } from './children-component/children-component.component';

@Component({
  selector: 'app-angular15min',
  imports: [ChildrenComponentComponent],
  templateUrl: './angular15min.component.html',
  styleUrl: './angular15min.component.scss',
})
export class Angular15minComponent implements OnDestroy {
  onAnswerYes(str: string) {
    console.log(`Ты скказала таносу дааааааааааа ${str}`);
  }

  pageTitle = signal('Angular 15 min'); // реактивный сигнал

  ngOnInit(): void {
    console.log('ONinit');
    this.pageTitle.update((prevState) => prevState + '+++1');
  }

  ngOnDestroy(): void {
    console.log('Компонент Умер))');
    this.pageTitle.set('gg');
  }

  handleCheck(event: any) {
    console.log('handleCheck: ', event);
  }
}
