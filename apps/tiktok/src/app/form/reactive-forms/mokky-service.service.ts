import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MokkyServiceService {
  getAdresses() {
    return of([
      {
        city: 'SilentHill',
        street: 'street',
        home: 1,
        room: 1,
      },
      {
        city: 'GotemCity',
        street: 'street',
        home: 2,
        room: 2,
      },
    ]);
  }

  getFeatures() {
    return of([
      {
        code: 'robo',
        label: 'Robocassa',
        value: true,
      },
      {
        code: 'Ycasa',
        label: 'Юкасса',
        value: false,
      },
    ]);
  }
}
