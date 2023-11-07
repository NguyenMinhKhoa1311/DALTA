import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from 'src/reservations/entities/reservation.entity';
import { PaymentSchema } from './entities/payment.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Payment',
        schema: PaymentSchema,
      },
      {
        name: 'Reservation',
        schema: ReservationSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      }
    ]),
    forwardRef(() => ReservationsModule),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
