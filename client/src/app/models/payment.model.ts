import { Reservation } from "./reservation.model";
import { User } from "./user.model";

export interface Payment {
    paymentId: string;
    _id: string;
    dayPayment: string;
    reservationId: Reservation;
    customerId: User;


}
