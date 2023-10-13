import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string) {
    return this.httpClient.get<User>(`http://localhost:3000/user/${email}`);
  }

  createUser(user: any) {
    return this.httpClient.post<User>('http://localhost:3000/user', user);
  }
}
