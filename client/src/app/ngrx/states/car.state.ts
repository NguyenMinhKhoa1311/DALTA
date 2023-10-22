import { Car } from 'src/app/models/car.model';

export interface CarState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  carList: Car[];
  isAddLoading: boolean;
  isAddSuccess: boolean;
  addErrMess: string;
  car: Car;
  isRemoveLoading: boolean;
  isRemoveSuccess: boolean;
  removeErrMess: string;
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
  updateErrMess: string;
  isConfirmLoading: boolean;
  isConfirmSuccess: boolean;
  confirmErrMess: string;

}
