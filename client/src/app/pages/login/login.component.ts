import { Component } from '@angular/core';
import * as AuthAcitons from 'src/app/ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  loginWithGoogle() {
    let loginResult = this.store.dispatch(AuthAcitons.login());
    if (loginResult == null) {
      console.log('Login failed');
    } else {
      console.log('Login success');
      this.router.navigate(['/home']);
    }
  }
}
