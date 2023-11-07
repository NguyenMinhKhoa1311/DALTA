import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
  AfterViewInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/models/car.model';
import * as CarAction from 'src/app/ngrx/actions/car.actions';
import * as UserActions from 'src/app/ngrx/actions/user.actions';
import * as ReservationActions from 'src/app/ngrx/actions/reservation.actions';
import * as PaymentActions from 'src/app/ngrx/actions/payment.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CarState } from 'src/app/ngrx/states/car.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { ReservationState } from 'src/app/ngrx/states/reservation.state';
import { PaymentState } from 'src/app/ngrx/states/payment.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  carList: Car[] = [];
  user: User = <User>{};
  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  isCreateReservationSuccess$ = this.store.select('reservation', 'isCreateSuccess');
  isGetReservationSuccess$ = this.store.select('reservation', 'isGetOneSuccess');
  reservation_id: string = '';

  constructor(
    private store: Store<{
      car: CarState;
      auth: AuthState;
      user: UserState;
      reservation: ReservationState;
      payment: PaymentState;
    }>,
    public dialog: MatDialog
  ) {
    this.isCreateReservationSuccess$.subscribe((val) => {
      if (val ) {
          console.log(this.reservationData.reservationId);
          this.store.dispatch(ReservationActions.getOne({reservationId: this.reservationData.reservationId}));
      }
    });
    this.store.select('reservation').subscribe((val) => {
      if (val != null && val != undefined) {
        if (val.isGetOneSuccess) {
          this.reservation_id = val.reservation._id;
          alert('Đặt xe thành công. Vui lòng thanh toán để hoàn tất đặt xe');
          this.paymentData = {
            paymentId: '1',
            dayPayment: '1',
            reservationId: val.reservation._id,
            customerId: this.user._id,
          };
          this.closeRentcarDialog();
          this.openPaymentDialog();
        }
      }
    });
  }
   generateRandomId(length: number): string {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.join("");
  }
  



  ngOnInit(): void {
    this.userFirebase$.subscribe((userFirebase) => {
      if (userFirebase != null && userFirebase != undefined) {
        console.log(userFirebase);
      }
    });
    this.user$.subscribe((user) => {
      if (user != null && user != undefined) {
        console.log(user);
        this.store.dispatch(UserActions.storedUser(user));
        this.user = user;
      }
    });
    this.store.select('car').subscribe((val) => {
      if (val != null && val != undefined) {
        this.carList = val.carList;
      }
    });
    this.store.dispatch(CarAction.get({ isConfirmed: true }));

    //date-pikcer
    const dateContainers = document.querySelectorAll('.input-container');
    dateContainers.forEach((dateContainer) => {
      const dateInput = dateContainer.querySelector(
        '.date-field'
      ) as HTMLInputElement;
      if (dateInput) {
        dateContainer.addEventListener('click', (event) => {
          dateInput.select();
        });
      }
    });
    const dateCheckin = document.getElementById(
      'date-checkin'
    ) as HTMLInputElement;
    const dateCheckout = document.getElementById(
      'date-checkout'
    ) as HTMLInputElement;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateCheckin.valueAsDate = today;
    dateCheckout.valueAsDate = tomorrow;

    // Không cho phép chọn ngày trước ngày hiện tại
    dateCheckin.min = today.toISOString().split('T')[0];
    const minDateCheckout = new Date(today);
    minDateCheckout.setDate(today.getDate() + 1);
    dateCheckout.min = minDateCheckout.toISOString().split('T')[0];

    dateCheckin.addEventListener('input', () => {
      const checkinDate = new Date(dateCheckin.value);
      const checkoutDate = new Date(dateCheckout.value);
      if (checkinDate > checkoutDate) {
        const newCheckoutDate = new Date(checkinDate);
        newCheckoutDate.setDate(newCheckoutDate.getDate() + 1);
        dateCheckout.valueAsDate = newCheckoutDate;
      }
    });

    dateCheckout.addEventListener('input', () => {
      const checkinDate = new Date(dateCheckin.value);
      const checkoutDate = new Date(dateCheckout.value);
      if (checkoutDate < checkinDate) {
        const newCheckinDate = new Date(checkoutDate);
        newCheckinDate.setDate(newCheckinDate.getDate() - 1);
        dateCheckin.valueAsDate = newCheckinDate;
      }
    });
    //date-pikcer
  }

  @ViewChild('appDialog3', { static: true })
  dialog3!: ElementRef<HTMLDialogElement>;
  cdr3 = inject(ChangeDetectorRef);

  openPaymentDialog() {
    this.dialog3.nativeElement.showModal();
    this.cdr3.detectChanges();
  }
  closePaymentDialog() {
    this.dialog3.nativeElement.close();
    this.cdr3.detectChanges();
  }

  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);
  selectCar: any = {
    _id: 'a',
    carId: 'a',
    name: 'a',
    model: 'a',
    categoryId: {
      _id: 'a',
      name: 'a',
      quantity: 0,
      categoryId: 'a',
    },
    manufacturerId: {
      _id: 'a',
      name: 'a',
      manufacturerId: 'a',
      quantity: 0,
    },
    ownerId: {
      _id: 'a',
      uid: 'a',
      name: 'a',
      email: 'a',
      phone: 'a',
      avatar: 'a',
      address: 'a',
      role: 'a',
      password: 'a',
    },
    price: 0,
    description: 'a',
    image: {
      _id: 'a',
      folderName: 'a',
      urls: ['a'],
    },
    location: 'a',
    deleveryService: false,
    status: false,
    seat: 0,
    door: 0,
    isConfirmed: false,
  };

  openRentcarDialog(car: Car) {
    this.selectCar = car;
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeRentcarDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }

  //reset date-picker
  ngAfterViewInit(): void {
    this.dialog2.nativeElement.addEventListener('close', () => {
      const dateCheckin = document.getElementById(
        'date-checkin'
      ) as HTMLInputElement;
      const dateCheckout = document.getElementById(
        'date-checkout'
      ) as HTMLInputElement;

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateCheckin.valueAsDate = today;
      dateCheckout.valueAsDate = tomorrow;
    });
  }

  reservationData = {
    reservationId: '',
    carId: '',
    customerId: '',
    startDate: '',
    endDate: '',
    status: false,
    total: 0,
  };


  paymentData: any = {
    paymentId: '1',
    dayPayment: '1',
    reservationId: '1',
    customerId: '1',
  };

  payForReservation() {
    const date = new Date();
    const dateString = date.toISOString();

    this.paymentData = {
      paymentId: this.reservationData.reservationId + '-' + dateString,
      dayPayment: dateString,
      reservationId: this.reservation_id,
      customerId: this.user._id,
    };
    this.store.dispatch(PaymentActions.create({ payment: this.paymentData }));
  }


  selectedDays: number = 0;

  updateTotalDays() {
    const dateCheckin = document.getElementById(
      'date-checkin'
    ) as HTMLInputElement;
    const dateCheckout = document.getElementById(
      'date-checkout'
    ) as HTMLInputElement;

    const checkinDate = new Date(dateCheckin.value);
    const checkoutDate = new Date(dateCheckout.value);

    if (checkinDate && checkoutDate) {
      const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.selectedDays = daysDiff; // Cập nhật giá trị tổng ngày
    }
  }


  submit(car: Car) {
    const dateCheckin = document.getElementById(
      'date-checkin'
    ) as HTMLInputElement;
    const dateCheckout = document.getElementById(
      'date-checkout'
    ) as HTMLInputElement;

    const checkinDate = dateCheckin.valueAsDate;
    const checkoutDate = dateCheckout.valueAsDate;

    // Kiểm tra nếu giá trị hợp lệ
    if (checkinDate && checkoutDate) {
      console.log('Ngày check-in:', checkinDate);
      console.log('Ngày check-out:', checkoutDate);

      // Tính số ngày thuê
      const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // 1000 milliseconds, 3600 seconds, 24 hours
      this.selectedDays = daysDiff;
      this.updateTotalDays();
      const string = this.generateRandomId(10);
      this.reservationData = {
        reservationId: car._id + this.user._id + string,
        carId: car._id,
        customerId: this.user._id,
        startDate: checkinDate.toUTCString(),
        endDate: checkinDate.toUTCString(),
        status: false,
        total: car.price * daysDiff,
      };
      console.log(this.reservationData);
      this.store.dispatch(
        ReservationActions.create({ reservation: this.reservationData })
      );
    } else {
      console.log('Ngày không hợp lệ');
    }
  }
}
