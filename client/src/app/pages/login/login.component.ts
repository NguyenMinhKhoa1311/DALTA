import { Component } from '@angular/core';
import * as AuthAcitons from 'src/app/ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { UserState } from 'src/app/ngrx/states/user.state';
import * as UserActions from 'src/app/ngrx/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  user$ = this.store.select('user', 'user');

  constructor(
    private store: Store<{ auth: AuthState, user: UserState }>,
    private router: Router
  ) {
    this.store.select('auth').subscribe((state) => {
      if (state.isSuccessful) {
        this.router.navigate(['/base/home']);
      }
    });
    this.user$.subscribe((user) => {
      console.log(user);
      
      if (user != null && user != undefined) {
        if (this.accountData.password != '' && this.accountData.email != '') {
          if (user.password == this.accountData.password) {
            this.router.navigate(['/base/home']);
          }
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
  }

  loginWithAccount() {
    this.accountData = {
      email: this.accountForm.value.email || '',
      password: this.accountForm.value.password || '',
    }
    this.store.dispatch(UserActions.getByEmail({ email: this.accountData.email }));
  }



  loginWithGoogle() {
    this.store.dispatch(AuthAcitons.login());
  }
}
