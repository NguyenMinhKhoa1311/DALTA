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

  create$ = createEffect(() =>
    this.action$.pipe(
      ofType(CarActions.add),
      exhaustMap((action) =>
        this.carService.createCar(action.car).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              if (item.message) {
                return CarActions.addFailure({ addErrMess: item.message });
              }
              return CarActions.addSuccess({ car: item });
            } else {
              return CarActions.addFailure({
                addErrMess: 'Car is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(CarActions.addFailure({ addErrMess: error }))
          )
        )
      )
    )
  );

  remote$ = createEffect(() =>
    this.action$.pipe(
      ofType(CarActions.remove),
      exhaustMap((action) =>
        this.carService.removeCar(action.carId).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return CarActions.removeSuccess();
            } else {
              return CarActions.removeFailure({
                removeErrMess: 'Car is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(CarActions.removeFailure({ removeErrMess: error }))
          )
        )
      )
    )
  );

  update$ = createEffect(() =>
    this.action$.pipe(
      ofType(CarActions.update),
      exhaustMap((action) =>
        this.carService.updateCar(action.car).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              if (item.message) {
                return CarActions.updateFailure({ updateErrMess: item.message });
              }
              return CarActions.updateSuccess({ car: item });
            } else {
              return CarActions.updateFailure({
                updateErrMess: 'Car is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(CarActions.updateFailure({ updateErrMess: error }))
          )
        )
      )
    )
  );
}
