import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';
export { prfoileActions } from './actionts';

export const selectProfiles = createSelector(
  profileFeature.selectUserName,
  (name) => name
);

export const selectProfileFiltered = createSelector(
  profileFeature.selectProfiles,
  (profile) => profile
);

export const selectProfilePage = createSelector(
  //берем весь стейт, и возвращаем из селектора
  profileFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size,
    };
  }
);

export const selectFilters = createSelector(
  profileFeature.selectFilters,
  (filters) => filters
);
