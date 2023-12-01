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
import * as ReviewActions from 'src/app/ngrx/actions/review.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CarState } from 'src/app/ngrx/states/car.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { ReservationState } from 'src/app/ngrx/states/reservation.state';
import { PaymentState } from 'src/app/ngrx/states/payment.state';
import { ReviewState } from 'src/app/ngrx/states/review.state';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  carList: Car[] = [];
  user: User = <User>{};
  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  reviews$ = this.store.select('review', 'reviewList');
  reviews: Review[] = [];
  isGetReviewSuccess = false;
  isCreateReservationSuccess$ = this.store.select(
    'reservation',
    'isCreateSuccess'
  );
  reservation_id: string = '';
  selectedDays: number = 1;
  totalCost: number = 0;
  avg_rating: any = 0;

  constructor(
    private store: Store<{
      car: CarState;
      auth: AuthState;
      user: UserState;
      reservation: ReservationState;
      payment: PaymentState;
      review: ReviewState;
    }>,
    public dialog: MatDialog
  ) {
    this.isCreateReservationSuccess$.subscribe((val) => {
      if (val) {
        this.openPaymentDialog();
      }
    });
    this.reviews$.subscribe((val) => {
      if (val.length > 0) {
        this.reviews = val;
        this.isGetReviewSuccess = true;
        console.log(this.reviews);
        this.calculateAverageRating();
      }
    });
  }

  calculateAverageRating() {
    if (this.reviews.length > 0) {
      let totalRating = 0;
      this.reviews.forEach((review) => {
        totalRating += review.rating;
      });
      this.avg_rating = totalRating / this.reviews.length;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(ReservationActions.reset());
  }
  generateRandomId(length: number): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.join('');
  }

  ngOnInit(): void {
    this.userFirebase$.subscribe((userFirebase) => {
      if (userFirebase != null && userFirebase != undefined) {
        console.log(userFirebase);
      }
    });
    this.user$.subscribe((user) => {
      if (user._id != null && user._id != undefined) {
        console.log(user);
        this.user = user;
        const userAsJson = JSON.stringify(user);

        // Lưu đối tượng userAsJson vào sessionStorage
        sessionStorage.setItem('user', userAsJson);
        console.log('lưu vào sessionStorage');
      } else {
        console.log('lấy từ sessionStorage');

        // Lấy đối tượng user từ sessionStorage
        const userAsJson = sessionStorage.getItem('user');
        console.log(userAsJson);

        // Chuyển đổi chuỗi sang đối tượng user
        this.user = JSON.parse(userAsJson || '');
        this.store.dispatch(UserActions.storedUser(this.user));
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
      // Tính toán tổng số ngày
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.totalCost = this.selectedDays * this.selectCar.price + 7900 * 2;
      // Hiển thị tổng tiền trên giao diện
      const totalCostElement = document.getElementById('total-cost');
      if (totalCostElement) {
        totalCostElement.textContent = `${this.totalCost}`;
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
      // Tính toán tổng số ngày
      const timeDiff = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
      this.selectedDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      this.totalCost = this.selectedDays * this.selectCar.price + 7900 * 2;
      // Hiển thị tổng tiền trên giao diện
      const totalCostElement = document.getElementById('total-cost');
      if (totalCostElement) {
        totalCostElement.textContent = `${this.totalCost}`;
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
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
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
    if (!this.user.uid) {
      alert('Bạn cần đăng nhập để thuê xe');
      return;
    } else {
      this.selectCar = car;
      this.dialog2.nativeElement.showModal();
      this.cdr2.detectChanges();
      const randomId = this.generateRandomId(10);
      this.reservationData = {
        reservationId: car._id + this.user._id + randomId,
        carId: car._id,
        customerId: this.user._id,
        startDate: '',
        endDate: '',
        status: false,
        total: 0,
        image: car.image._id,
      };
      this.store.dispatch(ReviewActions.get({ carId: car._id }));
      this.totalCost = this.selectCar.price + 7900 * 2;
    }
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
      this.selectedDays = 1;
      this.selectCar.price = 0;
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
    image: '',
  };

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

      const string = this.generateRandomId(10);
      this.reservationData = {
        reservationId: car._id + this.user._id + string,
        carId: car._id,
        customerId: this.user._id,
        startDate: checkinDate.toUTCString(),
        endDate: checkoutDate.toUTCString(),
        status: false,
        total: this.totalCost,
        image: car.image._id,
      };
      this.store.dispatch(
        ReservationActions.create({ reservation: this.reservationData })
      );
    } else {
      console.log('Ngày không hợp lệ');
    }
  }

  @ViewChild('appDialog4', { static: true })
  dialog4!: ElementRef<HTMLDialogElement>;
  cdr4 = inject(ChangeDetectorRef);

  openFilterDialog() {
    this.dialog4.nativeElement.showModal();
    this.cdr4.detectChanges();
  }
  closeFilterDialog() {
    this.dialog4.nativeElement.close();
    this.cdr4.detectChanges();
  }

  @ViewChild('appDialog5', { static: true })
  dialog5!: ElementRef<HTMLDialogElement>;
  cdr5 = inject(ChangeDetectorRef);

  openCommentDialog() {
    this.dialog5.nativeElement.showModal();
    this.cdr5.detectChanges();
  }
  closeCommentDialog() {
    this.commentForm.reset();
    this.dialog5.nativeElement.close();
    this.cdr5.detectChanges();
  }
  commentForm = new FormGroup({
    comment: new FormControl(''),
    rate: new FormControl(''),
  });

  submitComment() {
    const comment = this.commentForm.get('comment')?.value;
    const rate = this.commentForm.get('rate')?.value;
    const review = {
      carId: this.selectCar._id,
      customerId: this.user._id,
      comment: comment,
      rating: rate,
    };
    this.store.dispatch(ReviewActions.create({ review: review }));
    this.closeCommentDialog();
    console.log(review);
  }
  onStarClick(index: any) {
    this.commentForm.get('rate')?.setValue(index);
    for (let i = 1; i <= 5; i++) {
      const starElement = document.querySelector(`.fa-star:nth-child(${i})`);
      if (starElement) {
        if (i <= index) {
          starElement.classList.add('active');
        } else {
          starElement.classList.remove('active');
        }
      }
    }
  }
}
