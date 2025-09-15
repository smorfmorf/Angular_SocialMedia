import {
  prfoileActions,
  selectProfiles,
} from './../../../../../data-acsses/src/lib/store/selector';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { from, map, take, delay, tap } from 'rxjs';

import { AuthService } from '@tt/auth';
import { Store } from '@ngrx/store';
import { TtInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, TtInputComponent, FormsModule],
})
export class LoginComponent implements AfterViewInit {
  store = inject(Store);
  render2 = inject(Renderer2);
  userName = this.store.selectSignal(selectProfiles);

  @ViewChild('refName') refName!: ElementRef;

  handleClick(event: Event) {
    this.store.dispatch(
      prfoileActions.customEvents({ name: String(new Date()) })
    );
  }

  ngAfterViewInit(): void {
    this.render2.listen(this.refName.nativeElement, 'click', (event) =>
      this.handleClick(event)
    );
  }

  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onSubmit(event: Event) {
    if (this.form.valid) {
      console.log('value: ', this.form.value);

      //@ts-ignore это стрим с запросом на БЕК и мы подписываемся на его ответ
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate(['/']); //перенаправляем на главную
      });
    }
  }

  //! Введение в RxJs 1)создаем стрим через from
  constructor() {
    from([1, 2, 3, 4, 5])
      //труба, вставляем преобразование (тут конвеер)
      .pipe(
        map((val) => val * 2),
        take(2), // берем 2 значения и заканчиваем стрим
        delay(1000),
        // sideEffect - никак не влияет на стрим который щас происходит,
        // он не влияет на значение что полетит дальше а просто можно что-то сделать.

        // tap((val) => this.form.patchValue({ username: String(val) }))
        tap((val) =>
          this.form.patchValue({
            username: 'mazaka0011',
            password: 'CBrdOzrLcw',
          })
        )
      )

      // подписка на стрим
      .subscribe((val) => console.log(val));

    this.form.valueChanges.subscribe((val) => console.log(val));
  }
}
