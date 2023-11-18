import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";



export type RevenueDocument = HydratedDocument<Revenue>;

@Schema({timestamps: true})
export class Revenue {
    @Prop({required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',})
    carId: string;
    
    @Prop({required: true})
    total: number;

    @Prop({required: true})
    month: number;

    @Prop({required: true})
    year: number;


}
export const RevenueSchema = SchemaFactory.createForClass(Revenue);
