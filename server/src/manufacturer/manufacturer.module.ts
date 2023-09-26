import { Module, forwardRef } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturerSchema } from './entities/manufacturer.entity';
import { CarModule } from 'src/car/car.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: 'Manufacturer', schema: ManufacturerSchema
      }]),
      forwardRef(() => CarModule)
  ],
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  exports: [ManufacturerService]
})
export class ManufacturerModule {}
