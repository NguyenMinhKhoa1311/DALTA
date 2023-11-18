import { Module, forwardRef } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { UserSchema } from 'src/user/entities/user.entity';
import { CarSchema } from 'src/car/entities/car.entity';
import { ReservationSchema } from './entities/reservation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CarModule } from 'src/car/car.module';

import { StorageModule } from 'src/storage/storage.module';
import { StorageSchema } from 'src/storage/entities/storage.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Reservation',
        schema: ReservationSchema,
      },
      {
        name: 'Car',
        schema: CarSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Storage',
        schema: StorageSchema,
      }
    ]),
    forwardRef(() => CarModule),
    forwardRef(() => StorageModule),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
