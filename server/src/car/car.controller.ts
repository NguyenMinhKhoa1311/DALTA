import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { UpdateStatusDto } from './dto/update-status-car.dto';
import { ManufacturerService } from 'src/manufacturer/manufacturer.service';
import { CategoryService } from 'src/category/category.service';
import { ReservationsService } from 'src/reservations/reservations.service';
import { log } from 'console';

@Controller('car')
export class CarController {
  constructor(
    private carService: CarService,
    private manufacturerSrevice: ManufacturerService,
    private categoryService: CategoryService,
    private reservationService: ReservationsService,
     ) {}

  @Post('create')
  async create(@Body() createCarDto: CreateCarDto) {
    try{
      const newCar = await this.carService.create(createCarDto);
      // await this.manufacturerSrevice.increase(newCar.manufacturerId);
      // await this.categoryService.increase(newCar.categoryId);
      return newCar;
    }
    catch(err){
      throw err;
    }
  }


  @Get('all')
  async findAll() {
    try{
      const cars = await this.carService.findAll();
      return cars;
    }
    catch(err){
      throw err;
    }
  }
  
  @Get()
  async findByIsConfirmed(@Query('isConfirmed') isConfirmed: boolean) {
    try{
      const cars = await this.carService.findByIsConfirmed(isConfirmed);
      return cars;
    }
    catch(err){
      throw err;
    }
  }


  @Get("byCarId")
  async findOne(@Query('id') id: string) {
    try{
      const car = await this.carService.findOne(id);
      return car;
    }
    catch(err){
      throw err;
    }
  }
  
  @Get("byObjectId")
  async findByObjectId(@Query('id') id: string) {
    try{
      const car = await this.carService.findByObjectId(id);
      return car;
    }
    catch(err){
      throw err;
    }
  }



  @Put('update')
  async update(@Query('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    try{
      const updatedCar = await this.carService.update(id, updateCarDto);
      return updatedCar;
    }
    catch(err){
      throw err;
    }
  }
  @Put('status')
  async updateStatus(@Query('id') id: string, @Body() status: any) {
    try{
      const updatedCar = await this.carService.updateStatus(id, status.status);
      return updatedCar;
    }
    catch(err){
      throw err;
    }
  }

  @Put('allstatus')
  async updateAllStatus(@Body() updateStatusDto: UpdateStatusDto) {
    try {
      const { ids, status } = updateStatusDto;
  
      const updatedCars = await Promise.all(
        ids.map(async (id) => {
          const updatedCar = await this.carService.updateStatus(id, status);
          return updatedCar;
        })
      );
  
      return updatedCars;
    } catch (err) {
      throw err;
    }
  }

  

  @Put('isConfirmed')
  async updateIsConfirmed(@Query('id') id: string, @Body() isConfirmed: any) {
    try{
      const updatedCar = await this.carService.updateIsConfirmed(id, isConfirmed.status);
      await this.manufacturerSrevice.increase(updatedCar.manufacturerId);
      await this.categoryService.increase(updatedCar.categoryId);
      return updatedCar;
    }
    catch(err){
      throw err;
    }
  }

  @Delete('delete')
  async remove(@Query('id') id: string) {
    try{
      // const car = await this.carService.findOne(id);
      const deletedCar = await this.carService.remove(id);
      // await this.manufacturerSrevice.decrease(car.manufacturerId);
      // await this.categoryService.decrease(car.categoryId);
      return deletedCar;
    }
    catch(err){
      throw err;
    }
  }

  @Delete('deleteConfirmed')
  async removeConfirmed(@Query('id') id: string) {
    try{
      const deletedCar = await this.carService.remove(id);
      await this.manufacturerSrevice.decrease(deletedCar.manufacturerId);
      await this.categoryService.decrease(deletedCar.categoryId);
      return deletedCar;
    }
    catch(err){
      throw err;
    }
  }
}
