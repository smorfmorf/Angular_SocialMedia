import { ProfileService } from './../../../../profile/src/lib/services/profile.service';
import { inject, Injectable } from '@angular/core';
import { createActionGroup, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Profile } from '@tt/interfaces/profile';

// экшены либо можно по одному расписывать
export const prfoileActions = createActionGroup({
  source: 'profile',
  events: {
    'custom events': props<{ name: string }>(),

    'filter events': props<{ filters: Record<string, any> }>(),
    'profiles loaded': props<{ profiles: Profile[] }>(),
  },
});

//! Ассинхроный экшен (effect ловит экшен и возвращает новый)
@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);

  // экшен на фильтр профайлов (когда произойдет filterEvents то будет запускаться этот эффект и тут можно делать асинхроные запросы)
  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(prfoileActions.filterEvents),
      // делаем асинхроный запрос на бек
      switchMap((payload) =>
        this.profileService.filterProfiles(payload.filters)
      ),
      // и всю эту хуйню нужно превратить в экшен
      map((res) => prfoileActions.profilesLoaded({ profiles: res.items }))
    );
  });
}
