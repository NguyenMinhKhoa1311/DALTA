import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AboutComponent } from './components/about/about.component';
import { CarownerComponent } from './components/carowner/carowner.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HistoryComponent,
    SidebarComponent,
    AboutComponent,
    CarownerComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    CdkScrollable,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
  ],
})
export class LayoutModule {}
