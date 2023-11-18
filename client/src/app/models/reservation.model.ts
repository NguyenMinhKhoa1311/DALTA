import { Car } from "./car.model";
import { Storage } from "./storage.model";
import { User } from "./user.model";

export interface Reservation {
    _id: string;
    reservationId: string;
    carId: Car;
    customerId: User;
    startDate: string;
    endDate: string;
    status: boolean;
    total: number;
    image: Storage;
}
