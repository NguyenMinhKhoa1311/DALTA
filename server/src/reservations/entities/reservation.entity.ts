import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({timestamps: true})
export class Reservation {
    @Prop({required: true})
    reservationId: string;

    @Prop({required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    })
    carId: string;

    @Prop({required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',})
    customerId: string;

    @Prop({required: true})
    startDate: string;

    @Prop({required: true})
    endDate: string;

    @Prop({required: true})
    status: boolean;

    @Prop({required: true})
    total: number;
    
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
