import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CarService } from 'src/app/services/car/car.service';
import * as CarActions from '../actions/car.actions';

@Injectable()
export class CarEffects {
  constructor(private carService: CarService, private action$: Actions) {}
  getCar$ = createEffect(() =>
    this.action$.pipe(
      ofType(CarActions.get),
      exhaustMap(() =>
        this.carService.getCars().pipe(
          map((items) => {
            if (items != undefined || items != null) {
              if (items.message) {
                return CarActions.getFailure({ getErrMess: items.message });
              }
              return CarActions.getSuccess({ carList: items });
            } else {
              return CarActions.getFailure({
                getErrMess: 'Car is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(CarActions.getFailure({ getErrMess: error }))
          )
        )
      )
    )
  );
}
