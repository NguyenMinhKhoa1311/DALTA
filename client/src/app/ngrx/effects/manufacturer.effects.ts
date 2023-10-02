import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { ManufacturerService } from "src/app/services/manufacturer/manufacturer.service";
import { createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import * as ManufacturerActions from "../actions/manufacturer.actions";

@Injectable()
export class ManufacturerEffects {
  constructor(private manufacturerService: ManufacturerService, private action$: Actions) {}

  getManufacturer$ = createEffect(() =>
  this.action$.pipe(
    ofType(ManufacturerActions.get),
    switchMap((action) =>{
        return this.manufacturerService.getManufacturers();
    }),
    map((manufacturers) => {
        return ManufacturerActions.getSuccess({manufacturers: manufacturers});
    }),
    catchError((error) => {
        return of(ManufacturerActions.getFailure({errorMessage: error}));
    })
  ));


}