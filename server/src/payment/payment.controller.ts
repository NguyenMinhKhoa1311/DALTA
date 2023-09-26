import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
      try{
        const newPayment = await this.paymentService.create(createPaymentDto);
        return newPayment;
      }
      catch(err){
        throw err;
      }
  }

  @Get('all')
  async findAll() {
    try{
      const payments = await this.paymentService.findAll();
      return payments;
    }
    catch(err){
      throw err;
    }
  }

  @Get()
  async findOne(@Query('id') id: string) {
    try{
      const payment = await this.paymentService.findOne(id);
      return payment;
    }
    catch(err){
      throw err;
    }
  }

  @Put('update')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try{
      const updatedPayment = await this.paymentService.update(id, updatePaymentDto);
      return updatedPayment;
    }
    catch(err){
      throw err;
    }
  }

  @Delete('delete')
  async remove(@Param('id') id: string) {
    try{
      const deletedPayment = await this.paymentService.remove(id);
      return deletedPayment;
    }
    catch(err){
      throw err;
    }
  }
}
