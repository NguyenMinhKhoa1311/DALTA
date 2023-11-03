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
}
