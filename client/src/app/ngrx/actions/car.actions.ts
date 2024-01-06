import { Car } from 'src/app/models/car.model';
import { createAction, props } from '@ngrx/store';

export const get = createAction(
  '[car] get all',
  props<{ isConfirmed: boolean }>()
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

export const confirm = createAction('[Car] confirm', props<{ carId: string }>());
export const confirmSuccess = createAction('[car] confirm success');
export const confirmFailure = createAction(
  '[car] confirm failure',
  props<{ confirmErrMess: string }>()
);
export const resetIsAddSuccess = createAction('[car] reset is add success');

export const updateStatusTrueAll = createAction(
  '[car] update status all',
  props<{ ids: string[]}>()
);  

export const updateStatusTrueAllSuccess = createAction(
  '[car] update status all true success'
);

export const updateStatusTrueAllFailure = createAction(
  '[car] update status all failure',
  props<{ updateStatusAllErrMess: string }>()
);

export const updateStatusFalseAll = createAction(
  '[car] update status false all',
  props<{ ids: string[]}>()
);

export const updateStatusFalseAllSuccess = createAction(
  '[car] update status all success'
);

export const updateStatusFalseAllFailure = createAction(
  '[car] update status all failure',
  props<{ updateStatusAllErrMess: string }>()
);

export const resetUpdateAllStatus = createAction(
  '[car] reset update all status'
);