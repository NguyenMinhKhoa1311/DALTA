import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { AboutComponent } from './components/about/about.component';
import { CarownerComponent } from './components/carowner/carowner.component';
import { AdminComponent } from './components/admin/admin.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'carowner',
        component: CarownerComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
      {
        path: 'home/:uid',
        component: DetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
