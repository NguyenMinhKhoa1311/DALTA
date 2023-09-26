import { HttpException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Model } from 'mongoose';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PaymentService {

  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    @InjectModel(Reservation.name) private readonly reservationModel: Model<Reservation>,
  ){}
  async create(createPaymentDto: CreatePaymentDto) {
    try{
      const createdPayment = new this.paymentModel(createPaymentDto);
      return await createdPayment.save();
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try{
      const payments = await this.paymentModel.find().exec();
      return payments;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try{
      const payment = await this.paymentModel.findOne({paymentId: id})
      .exec();
      return payment;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try{
      const updatedPayment = await this.paymentModel.findOneAndUpdate(
        {paymentId: id},
        { ...updatePaymentDto},
        {new: true}
        );
        return updatedPayment;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async   remove(id: string) {
    try{
      const deletedPayment = await this.paymentModel.findOneAndDelete({paymentId: id}).exec();
      return deletedPayment;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
}
