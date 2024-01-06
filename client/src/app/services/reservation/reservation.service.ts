import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  create(reservation:any){
    console.log(reservation);
    
    return this.httpClient.post<Reservation>('http://localhost:3000/reservation/create', reservation);
  }
  get(customerId: string){
    return this.httpClient.get<Reservation[]>(`http://localhost:3000/reservation/byCustomerId?customerId=${customerId}`);
  }

  getOne(reservationId: string){
    console.log(reservationId);
    
    return this.httpClient.get<Reservation>(`http://localhost:3000/reservation/byReservationId?id=${reservationId}`);
  }
  getByStartDate(startDate: string){
    return this.httpClient.get<Reservation[]>(`http://localhost:3000/reservation/byStartDate?startDate=${startDate}`);
  }
  getByEndDate(endDate: string){
    return this.httpClient.get<Reservation[]>(`http://localhost:3000/reservation/byEndDate?endDate=${endDate}`);
  }
}
