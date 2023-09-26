import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";


export type ReviewDocument = HydratedDocument<Review>;



@Schema({timestamps: true})
export class Review {
    @Prop({required: true, unique: true})
    reviewId: string;

    @Prop({
        typ: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    })
    userId: string;
    
    @Prop({
        typ: mongoose.Schema.Types.ObjectId,
        ref: 'Car',})
    carId: string;

    @Prop({required: true})
    rating: number;
    

    

    
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
