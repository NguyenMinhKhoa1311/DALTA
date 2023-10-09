import { UserState } from '../states/user.state';
import { User } from 'src/app/models/user.model';
import * as UserActions from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: UserState = {
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: '',
    user: <User>{},
};

export const userReducer = createReducer(
    initialState,
    on(UserActions.getByEmail, (state, action) => {
        console.log(action.type);
        let newState: UserState = {
            ...state,
            isGetLoading: true,
            isGetSuccess: false,
            getErrMess: '',
            user: <User>{},
        };
        return newState;
    }),
    on(UserActions.getByEmailSuccess, (state, action) => {
        console.log(action.type);
        let newState: UserState = {
            ...state,
            isGetLoading: false,
            isGetSuccess: true,
            user: action.user,
        };
        return newState;
    }),
    on(UserActions.getByEmailFailure, (state, action) => {
        console.log(action.type);
        let newState: UserState = {
            ...state,
            isGetLoading: false,
            isGetSuccess: false,
            getErrMess: action.error,
        };
        return newState;
    }),
)