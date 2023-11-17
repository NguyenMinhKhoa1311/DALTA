import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from 'src/app/models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }
  getReviews(carId: string) {
    return this.httpClient.get<Review[]>(`http://localhost:3000/review/getByCarId?id=${carId}`);
  }
}
