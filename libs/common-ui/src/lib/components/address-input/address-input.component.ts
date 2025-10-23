import { Component, forwardRef, inject, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { debounceTime, switchMap, tap } from 'rxjs';
import { DadataService } from './dadata.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
@Component({
  selector: 'lib-address-input',
  imports: [TtInputComponent, ReactiveFormsModule, AsyncPipe, JsonPipe],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // multi: true нужно использовать в 1) CVA 2) для валидаторов (директив) 3) для интерсепторов в http
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  // Когда юзер вводит или выбирает — ты вызываешь this.onChange(newValue).
  onChange(value: any) {}
  searchControl = new FormControl('');
  isDropdownOpen = signal(false);

  dadataService = inject(DadataService);

  suggestions$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((val) => {
      return this.dadataService
        .getSuggestions(val as string)
        .pipe(tap((res) => this.isDropdownOpen.set(!!res.length)));
    })
  );

  onSelect(city: string) {
    this.isDropdownOpen.set(false);
    this.searchControl.patchValue(city, { emitEvent: false });
    this.onChange(city);
  }

  //данные приходят из формы → в компонент.
  writeValue(city: string): void {
    console.log('✌️city --->', city);
    this.searchControl.patchValue(city, { emitEvent: false });
  }
  //из твоего компонента → в форму
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
