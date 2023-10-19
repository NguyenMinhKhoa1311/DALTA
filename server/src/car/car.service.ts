import { HttpException, Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Model } from 'mongoose';
import { Car } from './entities/car.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Category } from 'src/category/entities/category.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CarService {


  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    @InjectModel(Manufacturer.name) private readonly manufacturerModel: Model<Manufacturer>,
    @InjectModel(Storage.name) private readonly storageModel: Model<Storage>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    ){}
  async create(createCarDto: CreateCarDto): Promise<Car> {
    try{
      const createdCar = new this.carModel(createCarDto);
      return await createdCar.save();
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try{
      const cars = await this.carModel.find()
      .populate('image','urls', this.storageModel)
      .populate('manufacturerId','name', this.manufacturerModel)
      .populate('categoryId','name', this.categoryModel)
      .populate('ownerId','name', this.userModel)
      .exec();
      return cars;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findByIsConfirmed(isConfirmed: boolean){
    try{
      const cars = await this.carModel.find({isConfirmed: isConfirmed})
      .populate('image','urls', this.storageModel)
      .populate('manufacturerId','name', this.manufacturerModel)
      .populate('categoryId','name', this.categoryModel)
      .populate('ownerId','name', this.userModel)
      .exec();
      return cars;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }


  async findOne(id: string) {
    try{
      const car = await this.carModel.findOne({carId: id})
      .populate('image','urls', this.storageModel)
      .populate('manufacturerId','name', this.manufacturerModel)
      .populate('categoryId','name', this.categoryModel)
      .populate('ownerId','name', this.userModel)
      .exec();
      return car;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findById(id: string){
    try{
      const car = await this.carModel.findById(id)
      .populate('image','urls', this.storageModel)
      .populate('manufacturerId','name', this.manufacturerModel)
      .populate('categoryId','name', this.categoryModel)
      .populate('ownerId','name', this.userModel)
      .exec();
      return car;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    try{
      const updatedCar = await this.carModel.findOneAndUpdate(
        {carId: id},
        { ...updateCarDto},
        {new: true}
        );
        return updatedCar;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }


  async remove(id: string) {
    try{
      const deletedCar = await this.carModel.findOneAndDelete({carId: id});
      return deletedCar;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
}
