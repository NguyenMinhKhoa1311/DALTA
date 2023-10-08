import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as UserActions from '../actions/user.actions';
import { UserService } from 'src/app/services/user/user.service';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService) {}

    getUserByEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getByEmail),
            mergeMap((action) =>
                this.userService.getUserByEmail(action.email).pipe(
                    map((user) => UserActions.getByEmailSuccess({ user: user })),
                    catchError((error) => of(UserActions.getByEmailFailure({ error })))
                )
            )
        )
    );
}
