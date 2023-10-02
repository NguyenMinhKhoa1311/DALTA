import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manufacturer } from 'src/app/models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private httpClient: HttpClient) { }
  getManufacturers() {
    return this.httpClient.get<Manufacturer[]>('http://localhost:3000/manufacturer/all');
  }
}
