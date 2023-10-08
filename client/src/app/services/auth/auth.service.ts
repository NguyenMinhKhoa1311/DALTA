import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async loginWithGoogle() {
    console.log('loginWithGoogle');
    
    let provider = new GoogleAuthProvider();
    try {
      let credential = await signInWithPopup(this.auth, provider);
      console.log(credential);
      return credential;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logout() {
    await signOut(this.auth);
  }
}
