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

  createCar(car: any) {
    return this.httpClient.post<Car[] | any>(
      'http://localhost:3000/car/create',
      car
    );
  }

  removeCar(carId: string) {
    return this.httpClient.delete(`http://localhost:3000/car/delete/${carId}`);
  }

  updateCar(car: any) {
    return this.httpClient.put<Car[] | any>(
      `http://localhost:3000/car/update/${car.carId}`,
      car
    );
  }
}
