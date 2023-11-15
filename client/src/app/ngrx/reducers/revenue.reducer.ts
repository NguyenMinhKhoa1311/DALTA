import { Revenue } from "src/app/models/revenue.model";
import { RevenueState } from "../states/revenue.state";
import * as RevenueActions from '../actions/revenue.actions';
import { createReducer, on } from "@ngrx/store";

export const initialState: RevenueState = {
    isUpdateTotalLoading: false,
    isUpdateTotalSuccess: false,
    updateTotalErrMess: '',
    revenue: <Revenue>{},
    }

export const revenueReducer = createReducer(
    initialState,
    on(RevenueActions.updateTotal, (state,action) => {

        
        let newState = {
            ...state,
            isUpdateTotalLoading: true,
            isUpdateTotalSuccess: false,
            updateTotalErrMess: '',
        };
        return newState;

    }),
    on(RevenueActions.updateTotalSuccess, (state, action) => {

        
        let newState = {
            ...state,
            isUpdateTotalLoading: false,
            isUpdateTotalSuccess: true,
            updateTotalErrMess: '',
        };
        return newState;

    
    }),
    on(RevenueActions.updateTotalFailure, (state, action) => {

        
        let newState = {
            ...state,
            isUpdateTotalLoading: false,
            isUpdateTotalSuccess: false,
            updateTotalErrMess: action.updateTotalErrMess,
        };
        return newState;

    
    }),
)