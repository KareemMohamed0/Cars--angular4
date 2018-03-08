import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatIconModule,
  MatSelectModule, MatInputModule, MatGridListModule, MatTableModule, MatDatepickerModule,
  MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { MakerComponent } from './maker/maker.component';
import { CountryComponent } from './country/country.component';
import { NotFoundComponent } from './not-found/not-found.component';


import { AuthGuard } from './auth.guard';
import { LogGuard } from './log.guard';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http.service';
import { TokenService } from './service/token.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LogGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'car/:id', component: CarDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add/car', component: AddCarComponent, canActivate: [AuthGuard] },
  { path: 'make', component: MakerComponent, canActivate: [AuthGuard] },
  { path: 'country', component: CountryComponent, canActivate: [AuthGuard] },
  { path: '*', component: NotFoundComponent, canActivate: [AuthGuard] },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddCarComponent,
    CarDetailsComponent,
    MakerComponent,
    CountryComponent,
    NotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatIconModule,
    MatSelectModule, MatInputModule, MatGridListModule, MatTableModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule, MatCardModule, MatFormFieldModule, MatToolbarModule, MatIconModule,
    MatSelectModule, MatInputModule, MatGridListModule, MatTableModule, MatDatepickerModule,
    MatNativeDateModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  providers: [AuthGuard, LogGuard, HttpService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
