import { createAction, props } from '@ngrx/store';

import { Reservation } from 'src/app/models/reservation.model';

export const create = createAction(
  '[reservation] Create',
  props<{ reservation: any }>()
);

export const createSuccess = createAction('[reservation] Create Success');

export const createFailure = createAction(
  '[reservation] Create Failure',
  props<{ errorMessage: string }>()
);

export const get = createAction(
  '[reservation] Get',
  props<{ customerId: string }>()
);

export const getSuccess = createAction(
  '[reservation] Get Success',
  props<{ reservations: Reservation[] }>()
);

export const getFailure = createAction(
  '[reservation] Get Failure',
  props<{ errorMessage: string }>()
);

export const getOne = createAction(
  '[reservation] Get One',
  props<{ reservationId: string }>()
);

export const getOneSuccess = createAction(
  '[reservation] Get One Success',
  props<{ reservation: Reservation }>()
);

export const getOneFailure = createAction(
  '[reservation] Get One Failure',
  props<{ errorMessage: string }>()
);
export const reset = createAction('[reservation] Reset');
export const updateStatus = createAction(
  '[reservation] Update Status',
  props<{ reservation: Reservation }>()
);
