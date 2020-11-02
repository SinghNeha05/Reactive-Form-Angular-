import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CareerInfoComponent } from './component/career-info/career-info.component';

import CareerInfoDataService from './component/career-info/career-info.data.service';
import CareerInfoUrlService from './component/career-info/career-info.url.service';
import CareerInfoHttpService from './component/career-info/career-info.http.service';


@NgModule({
  declarations: [
    AppComponent,
    CareerInfoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CareerInfoDataService,
    CareerInfoUrlService,
    CareerInfoHttpService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
