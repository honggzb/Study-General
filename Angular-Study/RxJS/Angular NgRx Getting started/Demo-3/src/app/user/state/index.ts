import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

const getUserFeatureState = createFeatureSelector<UserState>('users');
export const getMaskUseName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);
export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);
