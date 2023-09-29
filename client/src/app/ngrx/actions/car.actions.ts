import { Car } from 'src/app/models/car.model';
import { createAction, props } from '@ngrx/store';

export const get = createAction(
  '[Course] get all'
  // props<{ carId: string }>()
);

export const getSuccess = createAction(
  '[Course] get all success',
  props<{ carList: Car[] }>()
);

export const getFailure = createAction(
  '[Course] get all failure',
  props<{ getErrMess: any }>()
);
