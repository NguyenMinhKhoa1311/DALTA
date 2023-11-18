import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';

@Controller('revenue')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) {}

  @Post('create')
  async create(@Body() createRevenueDto: CreateRevenueDto) {
    try {
      return  await this.revenueService.create(createRevenueDto);
    }
    catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.revenueService.findAll();
    }
    catch (error) {
      throw error;
    }
  }

  @Get('getByCarId')
  async findOne(@Query('id') id: string) {
     try{
       return await this.revenueService.findOne(id);
     }
     catch (error) {
        throw error;
      }
  }
  @Get('getByCarIdAndMonth')
  async findOneByCarIdAndMonth(@Query('id') id: string, @Query('month') month: number) {
      try{
        return await this.revenueService.findOneByIdAndMonth(id, month);
      }
      catch (error) {
          throw error;
        }
    }

  @Put('update')
  async update(@Query('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
      try {
        return await this.revenueService.update(id, updateRevenueDto);
      }
      catch (error) {
        throw error;
      }
  }

  @Put("updateTotal")
  async updateTotal(@Query('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    try {
      let revenue = await this.revenueService.findOneByIdAndMonth(id, updateRevenueDto.month);
      if(!revenue) {
        let createRevenueDto = new CreateRevenueDto(id, updateRevenueDto.total, updateRevenueDto.month, updateRevenueDto.year);
        return await this.revenueService.create(createRevenueDto);
      }
      return await this.revenueService.updateTotal(id, updateRevenueDto.total, updateRevenueDto.month);
    }
    catch (error) {
      throw error;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try{
      return await this.revenueService.remove(id);
    }
    catch (error)
    {
      throw error;
    }
  }
}
