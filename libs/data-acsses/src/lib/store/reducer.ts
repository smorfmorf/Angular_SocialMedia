import { createFeature, createReducer, on } from '@ngrx/store';
import { prfoileActions } from './actionts';
import { Profile } from '../profile/profile.service';

export interface ProfileState {
  profiles: Profile[];
  filters: Record<string, any>;
  userName: string;
  page: number;
  size: number;
}

export const initialState: ProfileState = {
  userName: 'user: ???',

  profiles: [],
  filters: {},
  page: 1,
  size: 5,
};

// store
export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    // название события и что по нему делать
    //(а из функции редюсера нужно вернуть новое значение state, он не мутируется)
    on(prfoileActions.profilesLoaded, (state, payload) => ({
      ...state,
      profiles: state.profiles.concat(payload.profiles),
    })),

    // после этого сигнал пойдет в эффект и эффект вызовит profilesLoaded и запишут новые профайлы
    on(prfoileActions.filterEvents, (state, payload) => ({
      ...state,
      profiles: [],
      page: 1,
      profileFilers: payload.filters,
    })),

    on(prfoileActions.setPage, (state, payload) => {
      let page = payload.page;
      if (!page) page = state.page + 1;

      return {
        ...state,
        page,
      };
    }),
    // -------------------
    on(prfoileActions.customEvents, (state, payload) => ({
      ...state,
      userName: payload.name,
    }))
  ),
});

// Cоздать такой экшен который будет записывать все фильтры в стор
// и на  создание компонента фильтр посмотреть стор и востановить знач
