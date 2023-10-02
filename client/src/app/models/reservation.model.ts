import { Car } from "./car.model";
import { User } from "./user.model";

export interface Reservation {
    reservationId: string;
    _id: string;
    carId: Car;
    customerID: User;
    startDate: string;
    endDate: string;
    status: boolean;
    total: number;
}
