import { createAction, props } from "@ngrx/store";
import { Review } from "src/app/models/review.model";

export const create = createAction(
    '[review] Create',
    props<{ review: any }>()
);
export const createSuccess = createAction(
    '[review] Create Success',
);
export const createFailure = createAction(
    '[review] Create Failure',
    props<{ errorMessage: any }>()
);
export const get = createAction(
    '[review] Get',
    props<{ carId: string }>()
);
export const getSuccess = createAction(
    '[review] Get Success',
    props<{ reviews: Review[] }>()
);
export const getFailure = createAction(
    '[review] Get Failure',
    props<{ errorMessage: any }>()
);