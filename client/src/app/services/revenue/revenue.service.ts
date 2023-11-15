import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private httpClient: HttpClient) { }

  updateTotal(revenue: any){
    console.log(revenue);
    
    return this.httpClient.put<any>(`http://localhost:3000/revenue/updateTotal?id=${revenue.carId}`, revenue);
  }
}
