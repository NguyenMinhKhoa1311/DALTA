import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as AuthAcitons from 'src/app/ngrx/actions/auth.actions';
import * as UserActions from 'src/app/ngrx/actions/user.actions';
import { UserFirebase } from 'src/app/models/userFirebase.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userFirebase: UserFirebase = <UserFirebase>{};
  user$ = this.store.select('user', 'user');
  isLoginWithGoogle = false;

  regisForm = new FormGroup({
    _id: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-zA-Z-0-9]+/g),
    ]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/[0-9]+/g),
    ]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private auth: Auth,
    private store: Store<{ auth: AuthState; user: UserState }>,
    private router: Router
  ) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.isLoginWithGoogle = true;
        this.userFirebase = {
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          picture: user.photoURL || '',
        };
        this.store.dispatch(AuthAcitons.storedUserFirebase(this.userFirebase));
      }
    });
    this.store.select('user', 'isCreateSussess').subscribe((state) => {
      if (state) {
        this.router.navigate(['/base/login']);
      }
    });
  }

  register() {
    if (this.isLoginWithGoogle) {
      let regisData: User = {
        uid: this.userFirebase.uid,
        _id: '',
        avatar: this.userFirebase.picture,
        email: this.userFirebase.email,
        name: this.userFirebase.name,
        address: this.regisForm.value.address ?? '',
        phone: this.regisForm.value.phone ?? '',
        password: this.regisForm.value.password ?? '',
        role: 'user',
      };
      this.store.dispatch(UserActions.createUser({ user: regisData }));
      console.log(regisData);
    } else {
      let regisData: User = {
        uid: this.regisForm.value.phone ?? '',
        _id: '',
        avatar: 'https://ikay.vn/upload_images/images/2023/12/16/Nguyen-Van-Khai-CEO-cua-Ikay-Group.jpg',
        email: this.regisForm.value.email ?? '',
        name: this.regisForm.value.name ?? '',
        address: this.regisForm.value.address ?? '',
        phone: this.regisForm.value.phone ?? '',
        password: this.regisForm.value.password ?? '',
        role: 'user',
      };
      this.store.dispatch(UserActions.createUser({ user: regisData }));
      console.log(regisData);
    }
  }

  back() {
    this.router.navigate(['/login']);
  }
}
