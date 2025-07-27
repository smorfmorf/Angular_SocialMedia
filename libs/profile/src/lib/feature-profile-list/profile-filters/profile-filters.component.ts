import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, switchMap } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { prfoileActions } from 'libs/data-acsses/src/lib/store/actionts';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  store = inject(Store);
  fb = inject(FormBuilder);
  ProfileService = inject(ProfileService);
  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });
  constructor() {
    //! Подписка на контрол ввода (на изменение значения)
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        // меняем стрим чтобы сделать поиск на беке
        // switchMap((val) => {
        // return this.ProfileService.filterProfiles(val);
        // }),
        takeUntilDestroyed() // очищаем подписку при переходе на другую page
      )
      .subscribe((res) => {
        this.store.dispatch(
          prfoileActions.filterEvents({
            filters: res,
          })
        );
      });
  }
}
