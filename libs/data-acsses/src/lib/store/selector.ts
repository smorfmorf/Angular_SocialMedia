import { createSelector } from '@ngrx/store';
import { profileFeature } from './reducer';

export const selectProfiles = createSelector(
  profileFeature.selectUserName,
  (name) => name
);

export const selectProfileFilters = createSelector(
  profileFeature.selectProfiles,
  (filters) => filters
);
export { prfoileActions } from './actionts';
