import { createAction, props } from "@ngrx/store";
import { Manufacturer } from "src/app/models/manufacturer.model";

export const get = createAction(
    '[manufacturer] Get'
);

export const getSuccess = createAction(
    '[manufacturer] Get Success',
    props<{ manufacturers: Manufacturer[] }>()
);

export const getFailure = createAction(
    '[manufacturer] Get Failure',
    props<{ errorMessage: string }>()
);