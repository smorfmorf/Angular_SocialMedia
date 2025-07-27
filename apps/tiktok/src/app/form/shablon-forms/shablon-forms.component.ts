import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { NoReactValidator } from './no-react.validator';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-shablon-forms',
  imports: [JsonPipe, NoReactValidator, FormsModule],
  templateUrl: './shablon-forms.component.html',
  styleUrl: './shablon-forms.component.scss',
})
export class ShablonFormsComponent {
  text = '';

  onChangeText(text: string) {
    console.log('Бах');
    this.text = text;
  }

  person = {
    name: '',
    lastName: '',
    address: {
      street: '',
    },
  };

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      throw Error('Форма не валидна');
    }
    // @ts-ignore
    // console.log(window.ng.getDirectives(event.target)[2].value);
  }
}
