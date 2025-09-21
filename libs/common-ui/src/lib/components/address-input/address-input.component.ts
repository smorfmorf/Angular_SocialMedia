import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { tap } from 'rxjs';

@Component({
  selector: 'lib-address-input',
  imports: [TtInputComponent, ReactiveFormsModule],
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
  onChanger(value: any) {}
  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges
      .pipe(tap((val) => console.log(val)))
      .subscribe();
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {
    this.onChanger = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
