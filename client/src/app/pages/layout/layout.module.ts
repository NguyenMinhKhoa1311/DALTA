import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule],
})
export class LayoutModule {}
