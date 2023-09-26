import { Module, forwardRef } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './entities/car.entity';

import { ManufacturerModule } from 'src/manufacturer/manufacturer.module';
import { ManufacturerSchema } from 'src/manufacturer/entities/manufacturer.entity';
import { CategorySchema } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Car', schema: CarSchema
      },
      {
        name: 'Manufacturer', schema: ManufacturerSchema
      },
      {
        name: 'Category', schema: CategorySchema
      },
      {
        name: 'User', schema: UserSchema
      }
    ]),
      forwardRef(() => ManufacturerModule),
      forwardRef(() => CategoryModule)
  ],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService]
})
export class CarModule {}
