import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsComponent } from './form/reactive-forms/reactive-forms.component';
import { Angular15minComponent } from './form/angular15min_YT/angular15min.component';
import { ShablonFormsComponent } from './form/shablon-forms/shablon-forms.component';
import { catchError, finalize, fromEvent, Observable, of } from 'rxjs';
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


