import { Car } from 'src/app/models/car.model';
import { createAction, props } from '@ngrx/store';

export const get = createAction(
  '[car] get all'
  // props<{ carId: string }>()
);

export const getSuccess = createAction(
  '[car] get all success',
  props<{ carList: Car[] }>()
);

export const getFailure = createAction(
  '[car] get all failure',
  props<{ getErrMess: any }>()
);

export const add = createAction('[Car] add', props<{ car: any }>());

export const addSuccess = createAction('[car] add success');

export const addFailure = createAction(
  '[car] add failure',
  props<{ addErrMess: any }>()
);
export const remove = createAction('[Car] delete', props<{ carId: string }>());

export const removeSuccess = createAction('[car] delete success');

export const removeFailure = createAction(
  '[car] delete failure',
  props<{ removeErrMess: string }>()
);

export const update = createAction('[Car] update', props<{ car: any }>());
export const updateSuccess = createAction('[car] update success');
export const updateFailure = createAction(
  '[car] update failure',
  props<{ updateErrMess: string }>()
);
