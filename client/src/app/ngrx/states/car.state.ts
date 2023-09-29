import { Car } from 'src/app/models/car.model';

export interface CarState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  carList: Car[];
}
