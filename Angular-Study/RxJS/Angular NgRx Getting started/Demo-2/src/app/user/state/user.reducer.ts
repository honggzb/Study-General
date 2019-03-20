import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

import { User } from '../user';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');
export const getMaskUseName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export function reducer(state=initialState, action): UserState {
  switch(action.type) {
    case UserActionTypes.MaskUserName:
    return {
      ...state,
      maskUserName: action.payload
    };
    default:
      return state;
  }
}
