import { Review } from "src/app/models/review.model";

export interface ReviewState {
    isGettingReview: boolean;
    isGetReviewSuccess: boolean;
    getReviewErrMess: string;
    reviewList: Review[];
    isCreatingReview: boolean;
    isCreateReviewSuccess: boolean;
    createReviewErrMess: string;
}