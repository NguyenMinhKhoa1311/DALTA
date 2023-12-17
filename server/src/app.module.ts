import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentModule } from './payment/payment.module';
import { StorageModule } from './storage/storage.module';
import { RevenueModule } from './revenue/revenue.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://minhkhoa:13112002@atlascluster.8amvnf6.mongodb.net/',
    ),
    UserModule,
    CarModule,
    ManufacturerModule,
    CategoryModule,
    ReviewModule,
    ReservationsModule,
    PaymentModule,
    StorageModule,
    RevenueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
