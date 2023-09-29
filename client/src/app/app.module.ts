import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { carReducer } from './ngrx/reducers/car.reducer';
import { CarEffects } from './ngrx/effects/car.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      car: carReducer,
    }),
    EffectsModule.forRoot([CarEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
