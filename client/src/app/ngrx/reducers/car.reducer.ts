import { createReducer, on } from '@ngrx/store';
import * as CarActions from '../actions/car.actions';
import { CarState } from '../states/car.state';
import { Car } from 'src/app/models/car.model';

export const initialState: CarState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  carList: [],
  isAddLoading: false,
  isAddSuccess: false,
  addErrMess: '',
  car: <Car>{},
};

export const carReducer = createReducer(
  initialState,
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
  }),

  on(CarActions.add, (state, action) => {
    let newState: CarState = {
      ...state,
      isAddLoading: true,
      isAddSuccess: false,
      addErrMess: '',
    };
    return newState;
  }),

  on(CarActions.addSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isAddLoading: false,
      isAddSuccess: true,
      carList: [...state.carList, action.car],
    };
    return newState;
  }),

  on(CarActions.addFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isAddLoading: false,
      isAddSuccess: false,
      addErrMess: action.addErrMess,
    };
    return newState;
  })
);
