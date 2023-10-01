import { Car } from 'src/app/models/car.model';
import { createAction, props } from '@ngrx/store';

export const get = createAction(
  '[Car] get all'
  // props<{ carId: string }>()
);

export const getSuccess = createAction(
  '[Car] get all success',
  props<{ carList: Car[] }>()
);

export const getFailure = createAction(
  '[Car] get all failure',
  props<{ getErrMess: any }>()
);

export const add = createAction('[Car] add', props<{ car: Car }>());

export const addSuccess = createAction(
  '[Car] add success',
  props<{ car: Car }>()
);

export const addFailure = createAction(
  '[Car] add failure',
  props<{ addErrMess: any }>()
);
