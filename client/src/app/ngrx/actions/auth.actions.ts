import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] login');

export const loginSuccess = createAction('[Auth] login success');

export const loginFailure = createAction(
  '[Auth] login failure',
  props<{ errorMessage: any }>()
);

export const logout = createAction('[Auth] logout');

export const logoutSuccess = createAction('[Auth] logout success');

export const logoutFailure = createAction(
  '[Auth] logout failure',
  props<{ errorMessage: any }>()
);
