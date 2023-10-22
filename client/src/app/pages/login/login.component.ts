import { Component } from '@angular/core';
import * as AuthAcitons from 'src/app/ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserActions from 'src/app/ngrx/actions/user.actions';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserFirebase } from 'src/app/models/userFirebase.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoginWithGoogle = false;
  user$ = this.store.select('user', 'user');
  userFirebase: UserFirebase = <UserFirebase>{};

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
    this.store.select('auth').subscribe((state) => {
      if (state.isSuccessful) {
        this.store.dispatch(
          UserActions.getByEmail({ email: this.accountData.email })
        );
      }
    });

    this.user$.subscribe((user) => {
      console.log(user);

      if (user != <User>{} && user != undefined && user != null) {
        console.log('vo dc');
        

        if (
          this.accountData.password != '' &&
          this.accountData.email != '' &&
          !this.isLoginWithGoogle
        ) {
          if (user.password == this.accountData.password) {
            this.router.navigate(['/base/home']);
            console.log('vô tại đây');
          }
        } else {
          if (this.userFirebase.email == user.email && this.isLoginWithGoogle) {
            this.router.navigate(['/base/home']);
            console.log('vô tại đây');
          }
        }
      } else {
        if (this.isLoginWithGoogle) {
          console.log(this.userFirebase);
          this.router.navigate(['/register']);
        }
      }
    });
  }

  accountForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  accountData = {
    email: '',
    password: '',
  };

  loginWithAccount() {
    this.accountData = {
      email: this.accountForm.value.email || '',
      password: this.accountForm.value.password || '',
    };
    this.store.dispatch(
      UserActions.getByEmail({ email: this.accountData.email })
    );
  }

  loginWithGoogle() {
    this.isLoginWithGoogle = true;
    this.store.dispatch(AuthAcitons.login());
  }

  register() {
    this.isLoginWithGoogle = false;
    this.router.navigate(['/register']);
    console.log(this.isLoginWithGoogle);
  }
}
