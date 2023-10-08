import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const getByEmail = createAction(
    '[User] Get User',
    props<{ email: string }>()
);

export const getByEmailSuccess = createAction(
    '[User] Get User Success',
    props<{ user: User }>()
);

export const getByEmailFailure = createAction(
    '[User] Get User Failure',
    props<{ error: any }>()
);
