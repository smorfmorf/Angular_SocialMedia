import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsComponent } from './lib/reactive-forms/reactive-forms.component';
import { ShablonFormsComponent } from './lib/shablon-forms/shablon-forms.component';
import { Angular15minComponent } from './lib/angular15min/angular15min.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsComponent,
    ShablonFormsComponent,
    Angular15minComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tiktok';
}
