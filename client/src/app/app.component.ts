import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from './ngrx/states/user.state';
import { User } from './models/user.model';
import * as UserActions from './ngrx/actions/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';


  user: User = <User>{};
  constructor(
    private store: Store<{user: UserState}>
  ){
  }


  }


