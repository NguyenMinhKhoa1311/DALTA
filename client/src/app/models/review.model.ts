import { Car } from "./car.model";
import { User } from "./user.model";

export interface Review {
    _id: string;
    reviewId: string;
    userId: User;
    carId: Car;
    rating: number;
    comment: string;
    dayReview: string;
    }