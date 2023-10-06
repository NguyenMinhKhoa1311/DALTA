import { Reservation } from "src/app/models/reservation.model";
import { ReservationState } from "../states/reservation.state";
import * as ReservationActions from '../actions/reservation.actions';
import { createReducer, on } from "@ngrx/store";


export const initialState: ReservationState ={
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: '',
    reservationList: [],
    isCreateLoading: false,
    isCreateSuccess: false,
    createErrMess: '',
    reservation: <Reservation>{},
    isRemoveLoading: false,
    isRemoveSuccess: false,
    removeErrMess: '',
    isUpdateLoading: false,
    isUpdateSuccess: false,
    updateErrMess: '',

};

export const reservationReducer = createReducer(
    initialState,
    on(ReservationActions.create, (state) => ({
        ...state,
        isCreateLoading: true,
        isRemoveSuccess: false,
        createErrMess: '',
    })),
    on(ReservationActions.createSuccess, (state, action) => ({
        ...state,
        isCreateLoading: false,
        isCreateSuccess: true,
        getErrMess: '',

    })),
    on(ReservationActions.createFailure, (state, action) => ({
        ...state,
        isCreateLoading: false,
        isCreateSuccess: false,
        createErrMess: action.errorMessage,
    })),
)