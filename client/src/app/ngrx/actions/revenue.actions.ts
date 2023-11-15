import { createAction, props } from "@ngrx/store";

export const updateTotal  = createAction(
    '[revenue] update total',
    props<{revenue: any}>()
    );

export const updateTotalSuccess = createAction(
    '[revenue] update total success',
    );

export const updateTotalFailure = createAction(
    '[revenue] update total failure',
    props<{ updateTotalErrMess: string }>()
    );