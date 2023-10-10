import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';

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

  constructor(private router: Router) {
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
}
