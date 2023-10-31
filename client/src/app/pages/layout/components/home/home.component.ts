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
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CarState } from 'src/app/ngrx/states/car.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  carList: Car[] = [];
  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');

  constructor(
    private store: Store<{
      car: CarState;
      auth: AuthState;
      user: UserState;
    }>,
    public dialog: MatDialog
  ) {}

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

  submit() {
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

      console.log('Tổng số ngày thuê:', daysDiff);
    } else {
      console.log('Ngày không hợp lệ');
    }
  }
}
