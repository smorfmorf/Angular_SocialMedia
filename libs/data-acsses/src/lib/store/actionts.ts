import { Profile, ProfileService } from '../profile/profile.service';
import { inject, Injectable } from '@angular/core';
import { createActionGroup, props, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { selectFilters, selectProfileFilters } from './selector';

// экшены либо можно по одному расписывать
export const prfoileActions = createActionGroup({
  source: 'profile',
  events: {
    'custom events': props<{ name: string }>(),

    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
  },
});

//! Ассинхроный экшен/запрос (effect ловит экшен и возвращает новый)
@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  //(поток экшенов на него тоже можем подписаться ;D)
  // экшен на фильтр профайлов (подписываемся на все экшены и когда придет нужный, перехватываем его и запускаем эфект)
  actions$ = inject(Actions);
  profileService = inject(ProfileService);
  store = inject(Store);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(prfoileActions.filterEvents),
      withLatestFrom(
        this.store.select(selectProfileFilters),
        this.store.select(selectFilters)
      ),
      switchMap(([_, filters, pageANDsize]) =>
        this.profileService.filterProfiles({
          ...filters,
          ...pageANDsize,
        })
      ),
      // и тут типо делаем диспатч: нового экшена + данные - передача в reducer на обработку
      map((res) => prfoileActions.profilesLoaded({ profiles: res.items }))
    );
  });
}
