import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/models/car.model';
import * as CarAction from 'src/app/ngrx/actions/car.actions';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { CarState } from 'src/app/ngrx/states/car.state';
import { UserState } from 'src/app/ngrx/states/user.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  carList: Car[] = [];
  userFirebase$ = this.store.select('auth', 'userFirebase');
  user$ = this.store.select('user', 'user');
  confirmedCar$ = this.store.select('car', 'isConfirmSuccess');
  removeCar$ = this.store.select('car', 'isRemoveSuccess');

  constructor(
    private store: Store<{ car: CarState; auth: AuthState; user: UserState }>
  ) {
    this.store.select('car').subscribe((val) => {
      if (val != null && val != undefined) {
        this.carList = val.carList;
      }
    });
    this.confirmedCar$.subscribe((val) => {
      if(val) {
        this.store.dispatch(CarAction.get({ isConfirmed: false }));
      }
    });
    this.removeCar$.subscribe((val) => {
      if(val) {
        this.closeRentcarDialog();
        this.store.dispatch(CarAction.get({ isConfirmed: false }));
      }
    });
    
  }

  confirmCar(carId: string) {
    this.store.dispatch(CarAction.confirm({ carId }));

  }
  removeCar(carId: string) {
    this.store.dispatch(CarAction.remove({ carId }));

  }

  ngOnInit(): void {
    this.store.dispatch(CarAction.get({ isConfirmed: false }));

  }

  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);
  selectCar: Car = <Car>{};

  openRentcarDialog(car: Car) {
    this.selectCar = car;
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeRentcarDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
}
