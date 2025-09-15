import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[noReactValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NoReactValidator,
      multi: true,
    },
  ],
})
export class NoReactValidator implements Validator {
  changeValidate!: () => void;

  /* validate будет вызываться когда будет изменяться значение контрола
  если validate возвращает null то все ок */

  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    return control.value?.toLowerCase() === 'react'
      ? { noReact: { message: 'Никаких React' } }
      : null;
  }

  // ------------------------

  //registerOnValidatorChange нужен, чтобы сказать: "эй, Angular, проверь это поле снова — у меня изменилась логика валидации! Кратко: дает возможность зарегать такой callback который можно дернуть, чтобы вручную оповестить Angular что валидация изменилась, перепроверь
  registerOnValidatorChange?(fn: () => void): void {
    this.changeValidate = fn;
  }
}
