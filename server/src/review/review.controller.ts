import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() createReviewDto: CreateReviewDto) {
    try {
      const newReview = await this.reviewService.create(createReviewDto);
      return newReview;
    }
    catch (err) {
      throw err;
    }
  }

  @Get('all')
  async findAll() {
    try {
      const reviews = await this.reviewService.findAll();
      return reviews;
    }
    catch (err) {
      throw err;
    }
  }

  @Get("getByReviewId")
  async findOne(@Query('id') id: string) {
    try {
      const reviews = await this.reviewService.findOne(id);
      return reviews;
    }
    catch (err) {
      throw err;
    }
  }
  @Get("getByCarId")
  async findReviewsByCarId(@Query('id') id: string) {
    try {
      const reviews = await this.reviewService.findReviewsByCarId(id);
      return reviews;
    }
    catch (err) {
      throw err;
    }
  }


  @Put('update')
  async update(@Query('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    try {
      const updatedReview = await this.reviewService.update(id, updateReviewDto);
      return updatedReview;
    }
    catch (err) {
      throw err;
    }
  }

  @Delete('delete')
  async remove(@Param('id') id: string) {
    try {
      const deletedReview = await this.reviewService.remove(id);
      return deletedReview;
    }
    catch (err) {
      throw err;
    }
  }
}
