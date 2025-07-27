import { Profile } from '@tt/interfaces/profile';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable, firstValueFrom, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NameValidatorAsyncService implements AsyncValidator {
  http = inject(HttpClient);

  //! Асинхроный валидатор ОЧЕНЬ РЕДКА НЕ ПАРЬСЯ, нужно вернуть:либо ошибки, либо null просто завернутый в Observalbe (Наблюдателя)
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http
      .get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts')
      .pipe(
        delay(1000),
        map((users) => {
          return users.filter((user) => user.firstName === control.value)
            .length > 0
            ? null
            : {
                nameValid: {
                  message: `Имя должно быть одним из списка ${users
                    .map((user) => user.firstName)
                    .join(', ')}`,
                },
              };
        })
      );
  }

  constructor() {}
}
