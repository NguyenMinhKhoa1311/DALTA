import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type CarDocument = HydratedDocument<Car>;


@Schema({timestamps: true})
export class Car {
    @Prop({required: true, unique: true})
    carId: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    model: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
      })
      categoryId: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: true
      })
      manufacturerId: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
        })
        ownerId: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    door: number;

    @Prop({required: true})
    seat: number;

    @Prop({required: true})
    description: string;

    @Prop({
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Storage',
      required: true})
    image: string;

    @Prop({required: true})
    location: string;

    @Prop({required: true})
    status: boolean;

    @Prop({required: true})
    deleveryService: boolean;
    
}
export const CarSchema = SchemaFactory.createForClass(Car);



