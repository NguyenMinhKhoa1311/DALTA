import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { UserSchema } from 'src/user/entities/user.entity';
import { CarSchema } from 'src/car/entities/car.entity';
import { ReservationSchema } from './entities/reservation.entity';
import { MongooseModule } from '@nestjs/mongoose';

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
      }
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
