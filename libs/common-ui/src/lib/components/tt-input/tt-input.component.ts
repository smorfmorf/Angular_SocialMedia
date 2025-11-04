import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, input } from '@angular/core';

@Component({
  selector: 'lib-tt-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',

  //! ValueAccessor в Angular — это "переводчик" между Angular Forms и твоим кастомным компонентом.
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent),
    },
  ],
})

// implement - это когда берем обязательсво реализовать все чтобы подходило к тому от чего имплементируем  
// Forms, мощный механизм DI, RxJS OOP
export class TtInputComponent implements ControlValueAccessor {
  type = input<'text' | 'password'>('text');

  onChangeValue: any;
  value: string | null = null;

  // writeValue нужна чтобы модель отдала значение вьюхе
  writeValue(val: string | null): void {
    this.value = val;
  }

  // onChangeValue нужна чтобы вьюха отдала значение модели
  registerOnChange(fn: any): void {
    this.onChangeValue = fn;
  }

  registerOnTouched(fn: any): void { }
}

