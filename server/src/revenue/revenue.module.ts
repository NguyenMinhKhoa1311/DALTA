import { Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { Mongoose } from 'mongoose';
import { RevenueSchema } from './entities/revenue.entity';
import { CarSchema } from 'src/car/entities/car.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Revenue',
        schema: RevenueSchema,
      },
      {
        name: 'Car',
        schema: CarSchema,
      },
    ]),
  ],
  controllers: [RevenueController],
  providers: [RevenueService],
  exports: [RevenueService],
})
export class RevenueModule {}
