import { createFeature, createReducer, on } from '@ngrx/store';
import { prfoileActions } from './actionts';
import { Profile } from '../profile/profile.service';

export interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, any>;
  userName: string;
}

export const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  userName: 'user: ???',
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
      profiles: payload.profiles,
    })),
    on(prfoileActions.customEvents, (state, payload) => ({
      ...state,
      userName: payload.name,
    }))
  ),
});

// Cоздать такой экшен который будет записывать все фильтры в стор
// и на  создание компонента фильтр посмотреть стор и востановить знач
