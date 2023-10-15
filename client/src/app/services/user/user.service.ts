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

  createUser(newUser: any) {
    newUser = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      avatar: newUser.avatar,
      address: newUser.address,
      role: 'user',
      password: newUser.password,
    };
    return this.httpClient.post<User>(
      'http://localhost:3000/user/create',
      newUser
    );
  }
}
