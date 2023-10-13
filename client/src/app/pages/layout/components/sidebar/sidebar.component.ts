import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import * as AuthActions from 'src/app/ngrx/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/ngrx/states/auth.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserState } from 'src/app/ngrx/states/user.state';

interface Page {
  id: number;
  name: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  pageSelected: number = 0;
  url = '';

  pages: Page[] = [
    {
      id: 0,
      name: 'Home',
      link: 'base/home',
      icon: 'fa-solid fa-house',
    },
    {
      id: 1,
      name: 'History',
      link: 'base/history',
      icon: 'fa-solid fa-clock-rotate-left',
    },
    {
      id: 2,
      name: 'Car Owner',
      link: 'base/carowner',
      icon: 'fa-regular fa-address-card',
    },
    {
      id: 3,
      name: 'About',
      link: 'base/about',
      icon: 'fa-regular fa-address-card',
    },
  ];
  route$ = this.router.events;

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    uid: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState; user: UserState }>
  ) {
    this.store.select('user').subscribe((user) => {
      if (user != null && user != undefined) {
        this.userForm.controls.avatar.setValue(user.user.avatar);
        this.userForm.controls.email.setValue(user.user.email);
        this.userForm.controls.name.setValue(user.user.name);
        this.userForm.controls.uid.setValue(user.user.uid);
      }
    });

    combineLatest({
      route: this.route$,
    }).subscribe((res) => {
      if (this.router.url != this.url) {
        this.url = this.router.url;
        this.router.url === '/base/home' ? (this.pageSelected = 0) : null;
        this.router.url === '/base/history' ? (this.pageSelected = 1) : null;
        this.router.url === '/base/carowner' ? (this.pageSelected = 2) : null;
        this.router.url === '/base/about' ? (this.pageSelected = 3) : null;
      }
    });
  }

  selected(index: number) {
    this.router.navigate([this.pages[index].link]);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
