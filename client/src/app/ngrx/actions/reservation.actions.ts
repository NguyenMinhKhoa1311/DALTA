import { createAction, props } from "@ngrx/store";

import { Reservation } from "src/app/models/reservation.model";

export const create = createAction(
    '[reservation] Create',
    props<{ reservation: Reservation }>()
);

export const createSuccess = createAction(
    '[reservation] Create Success',
);

export const createFailure = createAction(
    '[reservation] Create Failure',
    props<{ errorMessage: string }>()
);
