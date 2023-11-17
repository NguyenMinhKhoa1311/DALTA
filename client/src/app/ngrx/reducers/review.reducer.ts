import { createReducer, on } from "@ngrx/store";
import { ReviewState } from "../states/review.state";
import * as ReviewActions from "../actions/review.actions";

export const initialState: ReviewState = {
    isGettingReview: false,
    isGetReviewSuccess: false,
    getReviewErrMess: '',
    reviewList: [],
    isCreatingReview: false,
    isCreateReviewSuccess: false,
    createReviewErrMess: '',
};

export const reviewReducer = createReducer(
    initialState,
    on(ReviewActions.create, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isCreatingReview: true,
            isCreateReviewSuccess: false,
            createReviewErrMess: '',
        };
        return newState;
    }
    ),
    on(ReviewActions.createSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isCreatingReview: false,
            isCreateReviewSuccess: true,
            createReviewErrMess: '',
        };
        return newState;
    }
    ),
    on(ReviewActions.createFailure, (state, action) => {
        console.log(action.errorMessage);
        let newState = {
            ...state,
            isCreatingReview: false,
            isCreateReviewSuccess: false,
            createReviewErrMess: action.errorMessage,
        };
        return newState;
    }
    ),
    on(ReviewActions.get, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isGettingReview: true,
            isGetReviewSuccess: false,
            getReviewErrMess: '',
        };
        return newState;
    }),
    on(ReviewActions.getSuccess, (state, action) => {
        console.log(action.type);
        let newState = {
            ...state,
            isGettingReview: false,
            isGetReviewSuccess: true,
            getReviewErrMess: '',
            reviewList: action.reviews,
        };
        return newState;
    }),
    on(ReviewActions.getFailure, (state, action) => {
        console.log(action.errorMessage);
        let newState = {
            ...state,
            isGettingReview: false,
            isGetReviewSuccess: false,
            getReviewErrMess: action.errorMessage,
        };
        return newState;
    }),

)