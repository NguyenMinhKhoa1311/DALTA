import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import * as ResevationActions from 'src/app/ngrx/actions/reservation.actions';
import * as UserActions from 'src/app/ngrx/actions/user.actions';
import * as PaymentActions from 'src/app/ngrx/actions/payment.actions';
import * as ReveueActions from 'src/app/ngrx/actions/revenue.actions';

import { PaymentState } from 'src/app/ngrx/states/payment.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { ReservationState } from 'src/app/ngrx/states/reservation.state';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Car } from 'src/app/models/car.model';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { RevenueState } from 'src/app/ngrx/states/revenue.state';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnDestroy{
  user: User = <User>{};
  user$ = this.store.select('user', 'user');
  reservation$ = this.store.select('reservation', 'reservationList');
  payment$ = this.store.select('payment', 'payment');
  reservations: Reservation[] = [];
  isCreatePaymentSuccess$ = this.store.select('payment', 'isSuccessful');

  isSelectedReservation: boolean = false;

  constructor(
    private store: Store<{
      user: UserState;
      reservation: ReservationState;
      payment: PaymentState;
      revenue: RevenueState
    }>
  ) {
    this.user$.subscribe((user) => {
      if (user._id != null && user._id != undefined) {
        console.log(user);
        this.store.dispatch(ResevationActions.get({ customerId: user._id }));
        this.user = user;
      }else{
        const userAsJson = sessionStorage.getItem('user');
        this.user = JSON.parse(userAsJson || '');
        this.store.dispatch(UserActions.storedUser(this.user));

      }
    });
    this.reservation$.subscribe((reservationList) => {
      if (reservationList != null && reservationList != undefined) {
        this.reservations = reservationList;
      }
    });
    this.isCreatePaymentSuccess$.subscribe((isSuccessful) => {
      if (isSuccessful) {
        this.closePaymentDialog();
      }
    });

  }
  ngOnDestroy(): void {
    this.store.dispatch(ResevationActions.reset());
  }

  generateRandomId(length: number): string {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result.join("");
    
  }


  @ViewChild('appDialog3', { static: true })
  dialog3!: ElementRef<HTMLDialogElement>;
  cdr3 = inject(ChangeDetectorRef);
  
  openPaymentDialog(reservation: Reservation) {
    const randomId = this.generateRandomId(10);
    this.paymentData = {
      paymentId: this.selectedReservation._id+this.user._id+randomId,
      dayPayment: "",
      reservationId: reservation._id,
      customerId: this.user._id,
    };
    this.selectedReservation = reservation;
    this.isSelectedReservation = true;
    this.dialog3.nativeElement.showModal();
    this.cdr3.detectChanges();
  }
  closePaymentDialog() {
    this.isSelectedReservation = false;
    this.selectedReservation = {
      _id: '',
      reservationId: '',
      carId: <Car>{},
      customerId: <User>{},
      startDate: '',
      endDate: '',
      total: 0,
      status: true,
    }
    this.paymentData = {
      paymentId: '',
      dayPayment: '',
      reservationId: '',
      customerId: '',
    };
    this.dialog3.nativeElement.close();
    this.cdr3.detectChanges();
  }

  selectedReservation: Reservation = {
    _id: '',
    reservationId: '',
    carId: <Car>{},
    customerId: <User>{},
    startDate: '',
    endDate: '',
    total: 0,
    status: false,
  };




  paymentData: any = {
    paymentId: '1',
    dayPayment: '1',
    reservationId: '1',
    customerId: '1',
  };

  revenueData: any = {
    carId: '1',
    total: 0,
    month: 1,
  };

  payForReservation() {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs; // Associate virtual file system from pdfFonts with pdfMake
    this.revenueData.carId = this.selectedReservation.carId._id;
    this.revenueData.total = this.selectedReservation.total;
    this.revenueData.month = new Date().getMonth()+1;
    let docDefinition = {
        content: [
          `Hóa đơn thanh toán`,
          `Tên khách hàng: ${this.selectedReservation.customerId.name}`,
          `Tên xe: ${this.selectedReservation.carId.name}`,
          `Ngày bắt đầu: ${this.selectedReservation.startDate}`,
          `Ngày kết thúc: ${this.selectedReservation.endDate}`,
          `Tổng tiền: ${this.selectedReservation.total}`,
        ]
    }

    
    pdfMake.createPdf(docDefinition).download(`HoaDon${this.selectedReservation._id}`);
    this.store.dispatch(ReveueActions.updateTotal({ revenue: this.revenueData }));
    this.paymentData.dayPayment = new Date().toISOString();
    this.store.dispatch(PaymentActions.create({ payment: this.paymentData }));
  }
}
