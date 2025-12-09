import { Component, forwardRef, inject, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { debounceTime, switchMap, tap } from 'rxjs';
import { DadataService } from '@tt/data-acsses';
import { AsyncPipe, JsonPipe } from '@angular/common';

/**
 * ? Это кастомный контрол(Custom Form Control), который ты регистрируешь, чтобы Angular мог использовать его в реактивных формах как обычный <input>.
1) multi: true нужно использовать в 1) CVA 2) для валидаторов (директив) 3) для интерсепторов в http
2) Декоратор @Component выполняется и регистрирует провайдер в DI системе
 Класс AddressInputComponent еще не существует => нужен forwardRef
“мы говорим Смотри: экземпляр класса появится чуть позже — вот на него ссылка.
тк сперва выполняется @Component, а потом будет создан класс 

Кратко: Декоратор выполняется раньше чем объявление класса в Runtime(выполнение кода). 
ForwardRef - это "обещание" что такой класс скоро будет объявлен.*/

// 1️⃣ Сначала выполняется декоратор @Component
@Component({
  selector: 'lib-address-input',
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      //! Регистрируем этот компонент как CVA (Указываем ссылку на класс, который будет создан ниже)
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
// 2️⃣ Потом компилируется класс
export class AddressInputComponent implements ControlValueAccessor {
  isDropDown = signal(true);

  searchControl = new FormControl('');
  private dadataService = inject(DadataService);

  suggestions$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((val: any) =>
      this.dadataService.getSuggestion(val).pipe(
        tap((res: any[]) => {
          this.isDropDown.set(Boolean(res.length));
        })
      )
    )
  );

  onPickSuggest(suggest: any) {
    this.isDropDown.set(false);

    this.addressForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      house: suggest.data.house,
    });

    // this.searchControl.patchValue(suggest, {
    //   emitEvent: false
    // })
    // this.onChange(suggest);
  }

  onChange(value: any) {}
  writeValue(city: string): void {
    this.searchControl.patchValue(city, {
      emitEvent: false,
    });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  // ----------

  addressForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    house: new FormControl(''),
  });
}
