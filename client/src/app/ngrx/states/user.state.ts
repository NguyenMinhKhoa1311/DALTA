import { User } from 'src/app/models/user.model';

export interface UserState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  user: User;
  isCreateSussess: boolean;
  isCreateLoading: boolean;
  createErrMess: string;
}
