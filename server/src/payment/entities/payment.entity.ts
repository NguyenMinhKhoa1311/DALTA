import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";


export type PaymentDocument = HydratedDocument<Payment>;


@Schema({timestamps: true})
export class Payment {
    @Prop({required: true, unique: true})
    paymentId: string;

    @Prop({required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    })
    reservationId: string;

    @Prop({required: true})
    dayPayment: string;

    @Prop({required: true})
    total: number;

}



export const PaymentSchema = SchemaFactory.createForClass(Payment);
