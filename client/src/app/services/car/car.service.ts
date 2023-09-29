import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Car } from 'src/app/models/car.model';
import { CarState } from 'src/app/ngrx/states/car.state';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private httpClient: HttpClient) {}

  cars: Car[] = [];
  getCars() {
    return this.httpClient.get<Car[] | any>('http://localhost:3000/car/all');
  }
}
