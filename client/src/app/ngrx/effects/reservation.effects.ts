import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { catchError, of, map, switchMap, exhaustMap } from 'rxjs';
import * as ReservationActions from '../actions/reservation.actions';

@Injectable()
export class ReservationEffects{
    constructor(
        private actions$: Actions,
        private reservationService: ReservationService
    ){}

    create$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ReservationActions.create),
        exhaustMap((action) =>
            this.reservationService.create(action.reservation).pipe(
                map((item) => {
                    if(item != undefined || item != null){
                        return ReservationActions.createSuccess();
                    }else{
                        return ReservationActions.createFailure({errorMessage: 'Reservation is undefined or null'});
                    }
                }),
                catchError((error) => of(ReservationActions.createFailure({errorMessage: error})))
            )
        )))

}