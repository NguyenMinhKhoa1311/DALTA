import { Reservation } from "src/app/models/reservation.model";
import { ReservationState } from "../states/reservation.state";
import * as ReservationActions from '../actions/reservation.actions';
import { createReducer, on } from "@ngrx/store";


export const initialState: ReservationState = {
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
    on(ReservationActions.create, (state,action) => {
        console.log(action.type);
        
        let newState = {
            ...state,
            isCreateLoading: true,
            isCreateSuccess: false,
            createErrMess: '',
        };
        return newState;

    }),
    on(ReservationActions.createSuccess, (state, action) => {
        console.log(action.type);
        
        let newState = {
            ...state,
            isCreateLoading: false,
            isCreateSuccess: true,
            createErrMess: '',
        };
        return newState;

    
    }),
    on(ReservationActions.createFailure, (state, action) => {
        console.log(action.errorMessage);
        
        let newState = {
            ...state,
            isCreateLoading: false,
            isCreateSuccess: false,
            createErrMess: action.errorMessage,
        };
        return newState;
    }),
    on(ReservationActions.get, (state, action) => {
        console.log(action.type);
        
        let newState = {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrMess: '',
        };
        return newState;

    }),
    on(ReservationActions.getSuccess, (state, action) => {
        console.log(action.type);
        
        let newState = {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            getErrMess: '',
            reservationList: action.reservations,
        };
        return newState;

    
    }),
    on(ReservationActions.getFailure, (state, action) => {
        console.log(action.errorMessage);
        
        let newState = {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrMess: action.errorMessage,
        };
        return newState;
    }),
)