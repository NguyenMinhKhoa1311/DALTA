import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ReviewService } from 'src/app/services/review/review.service';
import * as ReviewActions from '../actions/review.actions';


@Injectable()
export class ReviewEffects {

  constructor(private reviewService: ReviewService, private action$: Actions) {}
    getReview$ = createEffect(() =>
    this.action$.pipe(
        ofType(ReviewActions.get),
        exhaustMap((action) =>
        this.reviewService.getReviews(action.carId).pipe(
            map((review) =>
            ReviewActions.getSuccess({ reviews: review })
            ),
            catchError((error) =>
            of(ReviewActions.getFailure({ errorMessage: error }))
            )
        ))));
    createReview$ = createEffect(() =>
    this.action$.pipe(
        ofType(ReviewActions.create),
        exhaustMap((action) =>
        this.reviewService.createReview(action.review).pipe(
            map((review) =>
            ReviewActions.createSuccess()
            ),
            catchError((error) =>
            of(ReviewActions.createFailure({ errorMessage: error }))
            )
        ))));
    
}