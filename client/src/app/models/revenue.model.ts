import { Car } from "./car.model";

export interface Revenue {
    _id: string;
    carId: Car;
    total: number;
    month: number;
    year: number;
    }