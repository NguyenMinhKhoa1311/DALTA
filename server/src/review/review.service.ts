import { HttpException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './entities/review.entity';
import { Model } from 'mongoose';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Car.name) private readonly carModel: Model<Car>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  )
  {}
  async create(createReviewDto: CreateReviewDto) {
    try{
      const createdReview = new this.reviewModel(createReviewDto);
      return await createdReview.save();
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findAll() {
    try{
      const reviews = await this.reviewModel.find()
      .populate('carId','name', this.carModel)
      .exec();
      return reviews;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async findOne(id: string) {
    try{
      const review = await this.reviewModel.findOne({reviewId: id}).exec();
      return review;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
  async findReviewsByCarId(id: string) {
    try{
      const reviews = await this.reviewModel.find({carId: id}).exec();
      return reviews;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try{
      const updatedReview = await this.reviewModel.findOneAndUpdate(
        {reviewId: id},
        { ...updateReviewDto},
        {new: true}
        );
        return updatedReview;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string) {
    try{
      const deleteReview = await this.reviewModel.findOneAndDelete({reviewId: id});
      return deleteReview;
    }
    catch(err){
      throw new HttpException(err.message, err.status);
    }
  }
}
