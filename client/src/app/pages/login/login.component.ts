import { Component } from '@angular/core';
import * as AuthAcitons from 'src/app/ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.store.select('auth').subscribe((state) => {
      if (state.isSuccessful) {
        this.router.navigate(['/base/home']);
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
    this.accountData ={
      email: this.accountForm.value.email||'',
      password: this.accountForm.value.password||'',
    }
  }

  

  loginWithGoogle() {
    this.store.dispatch(AuthAcitons.login());
  }
}
