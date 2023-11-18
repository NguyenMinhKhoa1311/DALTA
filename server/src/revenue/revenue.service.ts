import { HttpException, Injectable } from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Revenue } from './entities/revenue.entity';
import { Model } from 'mongoose';
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class RevenueService {

  constructor(
    @InjectModel(Revenue.name) private readonly revenueModel: Model<Revenue>,
    @InjectModel(Car.name) private readonly carModel: Model<Car>,

    ){}

  async create(createRevenueDto: CreateRevenueDto) {
    try{
      const createdRevenue = new this.revenueModel(createRevenueDto);
      return await createdRevenue.save();
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

 async findAll() {
  try{
    const revenues = await this.revenueModel.find()
    .populate('carId','name', this.carModel)
    .exec();
    return revenues;
  }
  catch(error){
    throw new HttpException(error.message, error.status);
  }
    
  }

  async findOne(id: string) {
    try{
      const revenue = await this.revenueModel.findOne({carId: id})
      .populate('carId','name', this.carModel)
      .exec();
      if(!revenue){
        throw new HttpException('Revenue not found', 404);
      }
      return revenue;
    }catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findOneByIdAndMonth(id: string, month: number) {
    try{
      const revenue = await this.revenueModel.findOne({carId: id, month: month})
      .populate('carId','name', this.carModel)
      .exec();
      return revenue;
    }catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateRevenueDto: UpdateRevenueDto) {
    try {
      const updateRevenue = await this.revenueModel.findOneAndUpdate(
        {carId: id},
        updateRevenueDto, 
        {new: true});
        return updateRevenue;
      }
      catch(err){
        throw new HttpException(err.message, err.status);
      }

  }

  async updateTotal(id: string, total: number, month: number) {
    try {
      const updateRevenue = await this.revenueModel.findOneAndUpdate(
        {carId: id, month: month},
        {$inc: {total: total}}, 
        {new: true});
        return updateRevenue;
      }
      catch(err){
        throw new HttpException(err.message, err.status);
      }

  }

  async remove(id: string) {
    try{
      const revenue = await this.revenueModel.findOneAndDelete({carId: id});
      if(!revenue){
        throw new HttpException('Revenue not found', 404);
      }
      return revenue;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
}
