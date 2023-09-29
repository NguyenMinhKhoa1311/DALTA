import { createReducer, on } from '@ngrx/store';
import * as CarActions from '../actions/car.actions';
import { CarState } from '../states/car.state';
import { Car } from 'src/app/models/car.model';

export const initialState: CarState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  carList: [],
};

export const carReducer = createReducer(
  initialState,
  // on(CarActions.get, (state) => ({
  //   ...state,
  //   isGetLoading: true,
  //   isGetSuccess: false,
  //   getErrMess: '',
  // })),

  // on(CarActions.getSuccess, (state, { cars }) => ({
  //   ...state,
  //   isGetLoading: false,
  //   isGetSuccess: true,
  //   cars: cars,
  // })),

  // on(CarActions.getFailure, (state, { getErrMess }) => ({
  //   ...state,
  //   isGetLoading: false,
  //   isGetSuccess: false,
  //   getErrMess: getErrMess,
  // })),

  on(CarActions.get, (state, action) => {
    let newState: CarState = {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
      carList: [],
    };
    return newState;
  }),

  on(CarActions.getSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      carList: action.carList,
    };
    return newState;
  }),

  on(CarActions.getFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
    return newState;
  })
);
