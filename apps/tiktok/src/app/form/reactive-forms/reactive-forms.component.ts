import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, input, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { KeyValuePipe } from '@angular/common';
import { MokkyServiceService } from './mokky-service.service';
import { MaskitoDirective } from '@maskito/angular';
import { maskitoDateOptionsGenerator } from '@maskito/kit';
import { NameValidatorAsyncService } from './name-asyncValidator.service';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

interface Address {
  city: string;
  street: string;
  home: number | null;
  room: number | null;
}

function getNumbers() {
  return new FormGroup({
    home: new FormControl<string>(''),
    office: new FormControl<string>(''),
  });
}

function getAddressForm(
  item: Address = { city: '', street: '', home: null, room: null }
) {
  return new FormGroup({
    // city: new FormControl<string>({ value: 'SilentHill', disabled: true }),
    city: new FormControl<string>(item.city),
    street: new FormControl<string>(item.street),
    home: new FormControl<number | null>(item.home),
    room: new FormControl<number | null>(item.room),
  });
}

// Валидация имени буквы
function validatorStartWith(word: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(word)
      ? { startsWith: `Ошибка 🖕 нельзя начинать слово с: ${word}` }
      : null;
  };
}

// Валидация даты
function validateDateRange_FormGroup({
  formControlName,
  toControlNmae,
}: {
  formControlName: string;
  toControlNmae: string;
}): ValidatorFn {
  return (control: AbstractControl) => {
    const formControl = control.get(formControlName);
    const toControl = control.get(toControlNmae);

    if (!formControl || !toControl) {
      return null;
    }

    const fromDate = new Date(formControl.value);
    const toDate = new Date(toControl.value);

    if (fromDate > toDate) {
      toControl.setErrors({ dateRange: true });

      return {
        dateRange: { message: 'Ошибка дата начала больше даты окончания' },
      };
    }

    return null;
  };
}

//! кастомный валидатор 6 урок (а в шаблоных форм целая директива),                           а тут функция которая вернет ошибку либо null если их нет
// export const validatorStartWith: ValidatorFn = (control: AbstractControl) => {
//   return control.value.startsWith('я')
//     ? { startsWith: 'Ошибка я нельзя 🖕' }
//     : null;
// };

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule, KeyValuePipe, MaskitoDirective],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss',
})
export class ReactiveFormsComponent {

 text = input<number>()

 ngOnInit(){
    console.log(`txt ${typeof this.text()}`)

 }


  //? Маскит библиотека от T-bank для патерна в input
  readonly options = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/',
  });

  //* Новый способ работы с контролируемыми формами
  // #fb = inject(FormBuilder);
  // form = this.#fb.group({
  //   type: [ReceiverType.PERSON],
  // дефолтное значение
  //   name: this.#fb.nonNullable.control('RRR', Validators.required),
  //   inn: [''],
  //   lastName: [''],
  //   address: this.#fb.group({
  //     city: { value: 'SilentHill', disabled: true },
  //     street: [''],
  //     home: [null],
  //     room: [null],
  //   }),
  // });

  selectOption = ReceiverType;
  mokkyService = inject(MokkyServiceService);
  nameValidatorAsync = inject(NameValidatorAsyncService);

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', {
      //* валидация проще не нужны доп директивы
      validators: [Validators.required, validatorStartWith('Ж')],
      asyncValidators: [
        // без бинда будет потеря контекста(либо бинд либо в сервисе через стрелочную F)
        this.nameValidatorAsync.validate.bind(this.nameValidatorAsync),
      ],
      updateOn: 'blur',
    }),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),

    numbers: getNumbers(),

    addresses: new FormArray([getAddressForm()]),
    /* Создаём вложенную форму (подформу) с динамическими ключами 
    (Таже FormGroup, только не обЪявляем какое имя у контролов будет и <какой будет у них тип>).*/
    feature: new FormRecord({}),

    dateRange: new FormGroup(
      {
        from: new FormControl<Date | null>(null),
        to: new FormControl<Date | null>(null),
      },
      // у форм груп тоже есть валидатор
      validateDateRange_FormGroup({
        formControlName: 'from',
        toControlNmae: 'to',
      })
    ),
  });

  addAddress() {
    this.form.controls.addresses.push(getAddressForm());
  }
  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index);
  }

  //* Динамические формы(3 урок) Задача пришел массив из 2х адресов нужно построить форму и заполнить значением
  sortFn = () => 0;

  getFeaturesArray = [] as any;
  constructor() {


    this.mokkyService
      .getAdresses()
      .pipe(takeUntilDestroyed())
      .subscribe((JSON_adresses) => {
        // while (this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0);
        // }
        this.form.controls.addresses.clear();
        for (let item of JSON_adresses) {
          this.form.controls.addresses.push(getAddressForm(item));
        }
      });

    this.mokkyService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((JSON_getFeatures) => {
        this.getFeaturesArray = JSON_getFeatures;

        for (const feature of JSON_getFeatures) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    /*--------------------------------------------------------------------------*/
    // Когда меняется значение контрола (type) можно подписаться
    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        this.form.controls.inn.clearValidators();
        console.log('this.form.value:', this.form.value);
        // Динамическая валидация
        if (value === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators(Validators.required);
          console.log('value$', value);
        }
      });
  }

  onSubmit(event: FormGroup) {
    this.form.markAllAsTouched(); //делает все контролы тач
    this.form.updateValueAndValidity(); //смотрит все ли ок по валидаторам

    if (this.form.invalid) {
      throw Error('Форма не валидна');
    }
    //! задаем динамически свойства формы через patchValue
    // const formPath = {
    //   name: 'Mazaka',
    //   lastName: '0011',
    //   address: {
    //     city: 'Silent City',
    //     street: 'Hill Street',
    //     home: 67,
    //     room: 77,
    //   },
    // };
    // this.form.patchValue(formPath);
    if (this.form.valid) {
      console.log('Валидация успешна собираем данные:', this.form.value);
      this.form.reset();
    }
  }
}
