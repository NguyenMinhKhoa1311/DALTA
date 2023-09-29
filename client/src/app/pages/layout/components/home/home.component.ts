import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CarAction from 'src/app/ngrx/actions/car.actions';
import { CarState } from 'src/app/ngrx/states/car.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly carListForm = new FormGroup({
    carList: new FormControl('', [Validators.required]),
  });

  readonly carList = [
    { id: 1, name: 'Audi' },
    { id: 2, name: 'BMW' },
    { id: 3, name: 'Mercedes' },
    { id: 4, name: 'Volkswagen' },
    { id: 5, name: 'Ford' },
    { id: 6, name: 'Fiat' },
    { id: 7, name: 'Honda' },
    { id: 8, name: 'Toyota' },
    { id: 9, name: 'Hyundai' },
    { id: 10, name: 'Kia' },
  ];

  constructor(
    private router: Router,
    private store: Store<{ car: CarState }>
  ) {}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.store.dispatch(CarAction.get());
  }
}
