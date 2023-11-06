import { Component } from '@angular/core';
import * as ResevationActions from 'src/app/ngrx/actions/reservation.actions';
import * as UserActions from 'src/app/ngrx/actions/user.actions';
import * as PaymentActions from 'src/app/ngrx/actions/payment.actions';

import { PaymentState } from 'src/app/ngrx/states/payment.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { ReservationState } from 'src/app/ngrx/states/reservation.state';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { Reservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  user: User = <User>{}
  user$ = this.store.select('user', 'user');
  reservation$ = this.store.select('reservation', 'reservationList');
  payment$ = this.store.select('payment', 'payment');
  reservations:Reservation[] = [];

  constructor(
    private store: Store<{
      user: UserState,
      reservation: ReservationState,
      payment: PaymentState
    }>
  ) {

    this.user$.subscribe((user) => {
      if (user != null && user != undefined) {
        console.log(user);
        this.store.dispatch(ResevationActions.get({ customerId: user._id }));
        this.user = user;
      }
    });
    this.reservation$.subscribe((reservationList) => {
      if (reservationList != null && reservationList != undefined) {
        this.reservations = reservationList;
      }
    });
    this.payment$.subscribe((payment) => {
      if (payment != null && payment != undefined) {
        console.log(payment);
      }
    });
   }

   payment(reservationId: string){
      this.store.dispatch(PaymentActions.get({paymentId: reservationId}));

   }


}
