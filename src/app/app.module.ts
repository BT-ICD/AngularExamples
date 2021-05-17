import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { EmpModule } from './emp/emp.module';
import { SignalRDemoModule } from './signal-rdemo/signal-rdemo.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    AppRoutingModule,
    ProductModule,
    EmpModule,
    
    SignalRDemoModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
