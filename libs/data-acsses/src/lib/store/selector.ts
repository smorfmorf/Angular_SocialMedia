import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';
export { prfoileActions } from './actionts';

export const selectProfiles = createSelector(
  profileFeature.selectUserName,
  (name) => name
);

export const selectProfileFilters = createSelector(
  profileFeature.selectProfiles,
  (profile) => profile
);

export const selectProfilePage = createSelector(
  //берем весь стейт
  profileFeature.selectProfileFeatureState,
  (state) => {
    //что возвращаем из селектора
    return {
      page: state.page,
      size: state.size,
    };
  }
);

export const selectFilters = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
);
