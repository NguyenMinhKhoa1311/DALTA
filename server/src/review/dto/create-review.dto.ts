export class CreateReviewDto {
    constructor(
        public reviewId: string,
        public reservationId: string,
        public userId: string,
        public rating: number,
        public comment: string,
        public dayReview: string,
    ){}
}
