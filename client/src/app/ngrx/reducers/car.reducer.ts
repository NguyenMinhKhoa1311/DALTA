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
  isRemoveLoading: false,
  isRemoveSuccess: false,
  removeErrMess: '',
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updateErrMess: '',
  isConfirmLoading: false,
  isConfirmSuccess: false,
  confirmErrMess: '',
  isUpdateStatusTrueAllLoading:false,
  isUpdateStatusAllTrueSuccess:false,
  updateStatusAllTrueErrMess:'',
  isUpdateStatusFalseAllLoading:false,
  isUpdateStatusAllFalseSuccess:false,
  updateStatusAllFalseErrMess: ''

};

export const carReducer = createReducer(
  initialState,
  on(CarActions.get, (state, action) => {
    console.log(action.type);
    
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
    console.log(action.type);
    let newState: CarState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      carList: action.carList,
    };
    return newState;
  }),

  on(CarActions.getFailure, (state, action) => {
    console.log(action.type);
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
      addErrMess: '',
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
  }),
  on(CarActions.remove, (state, action) => {
    let newState: CarState = {
      ...state,
      isRemoveLoading: true,
      isRemoveSuccess: false,
      removeErrMess: '',
    };
    return newState;
  }),
  on(CarActions.removeSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isRemoveLoading: false,
      isRemoveSuccess: true,
      removeErrMess: '',
    };
    return newState;
  }),
  on(CarActions.removeFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isRemoveLoading: false,
      isRemoveSuccess: false,
      removeErrMess: action.removeErrMess,
    };
    return newState;
  }),
  on(CarActions.update, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updateErrMess: '',
    };
    return newState;
  }
  ),
  on(CarActions.updateSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
      updateErrMess: '',
    };
    return newState;
  }),
  on(CarActions.updateFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateErrMess: action.updateErrMess,
    };
    return newState;
  }),

  on(CarActions.confirm, (state, action) => {
    let newState: CarState = {
      ...state,
      isConfirmLoading: true,
      isConfirmSuccess: false,
      confirmErrMess: '',
    };
    return newState;
  }
  ),
  on(CarActions.confirmSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isConfirmLoading: false,
      isConfirmSuccess: true,
      confirmErrMess: '',
    };
    return newState;
  }),
  on(CarActions.confirmFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isConfirmLoading: false,
      isConfirmSuccess: false,
      confirmErrMess: action.confirmErrMess,
    };
    return newState;
  }),
  on(CarActions.resetIsAddSuccess, (state, action) => {
    let newState: CarState = {
        ...state,
        isAddSuccess: false,
        isAddLoading: false,
    };
    return newState;
  }),
  on(CarActions.updateStatusTrueAll, (state, action) => {
    console.log(action.type,action.ids);
    let newState: CarState = {
      ...state,
      isUpdateStatusTrueAllLoading: true,
      isUpdateStatusAllTrueSuccess: false,
      updateStatusAllTrueErrMess: '',
    };
    return newState;
  }
  ),
  on(CarActions.updateStatusTrueAllSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateStatusTrueAllLoading: false,
      isUpdateStatusAllTrueSuccess: true,
      updateStatusAllTrueErrMess: '',
    };
    return newState;
  }),
  on(CarActions.updateStatusTrueAllFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateStatusTrueAllLoading: false,
      isUpdateStatusAllTrueSuccess: false,
      updateStatusAllTrueErrMess: action.updateStatusAllErrMess,
    };
    return newState;
  }),
  on(CarActions.updateStatusFalseAll, (state, action) => {
    console.log(action.type,action.ids);
    
    let newState: CarState = {
      ...state,
      isUpdateStatusFalseAllLoading: true,
      isUpdateStatusAllFalseSuccess: false,
      updateStatusAllFalseErrMess: '',
    };
    return newState;
  }
  ),
  on(CarActions.updateStatusFalseAllSuccess, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateStatusFalseAllLoading: false,
      isUpdateStatusAllFalseSuccess: true,
      updateStatusAllFalseErrMess: '',
    };
    return newState;
  }),
  on(CarActions.updateStatusFalseAllFailure, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateStatusFalseAllLoading: false,
      isUpdateStatusAllFalseSuccess: false,
      updateStatusAllFalseErrMess: action.updateStatusAllErrMess,
    };
    return newState;
  }),
  on(CarActions.resetUpdateAllStatus, (state, action) => {
    let newState: CarState = {
      ...state,
      isUpdateStatusAllTrueSuccess: false,
      isUpdateStatusAllFalseSuccess: false,
      updateStatusAllTrueErrMess: '',
      updateStatusAllFalseErrMess: ''
    };
    return newState;
  })

);
