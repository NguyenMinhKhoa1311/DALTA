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
}
