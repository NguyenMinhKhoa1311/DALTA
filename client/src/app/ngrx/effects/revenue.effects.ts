import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { RevenueService } from 'src/app/services/revenue/revenue.service';
import * as RevenueActions from '../actions/revenue.actions'


@Injectable()
export class RevenueEffects {
  constructor(private revenueService: RevenueService, private action$: Actions) {}

updateTotal$ = createEffect(() =>
this.action$.pipe(
  ofType(RevenueActions.updateTotal),
  exhaustMap((action) =>
    this.revenueService.updateTotal(action.revenue).pipe(
      map((item) => {
        if (item != undefined || item != null) {
          if (item.message) {
            return RevenueActions.updateTotalFailure({ updateTotalErrMess: item.message });
          }
          return RevenueActions.updateTotalSuccess();
        } else {
          return RevenueActions.updateTotalFailure({
            updateTotalErrMess: 'Revenue is undefined or null',
          });
        }
      }),
      catchError((error) =>
        of(RevenueActions.updateTotalFailure({ updateTotalErrMess: error }))
      )
    )
  )
)
);
}
