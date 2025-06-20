import { Profile } from './../../services/profile.service';
import {
  Component,
  computed,
  effect,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ImgUrlPipe } from '../../pipe/img-url.pipe';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-header',
  imports: [ImgUrlPipe, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //  можно сразу сделать props сигналом как в React
  profile = input<Profile>();

  ngOnInit(): void {
    console.log(this.profile());
  }

  //! Мои тесты Angular (а именно события, бросок данных родителю, effect-типо watch, но вних нельзя делать запись значения) -----------------------------
  @Output() TestEmitAngular = new EventEmitter<any>();

  // В ангуляре проще вешать события, не нужно выбирать элемент и тд (директива просто вешается на какой-то обработчик)
  // событие, массив аргументов, которые будут переданы в функцию
  @HostListener('click', ['$event'])
  click(event: any) {
    console.log(event.target);
  }

  userName = signal('');
  constructor() {
    effect(() => {
      console.log('userName changed:', this.userName());

      // Передаем данные родительскому Компоненту
      this.TestEmitAngular.emit('(✅ типо $emit - во Vue)');
    });
  }
}
