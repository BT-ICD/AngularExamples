import { BrowserModule } from '@angular/platform-browser';
import {  NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { EmpModule } from './emp/emp.module';
import { SignalRDemoModule } from './signal-rdemo/signal-rdemo.module';
import { UserLoginModule } from './user-login/user-login.module';
import { HttpClientModule } from '@angular/common/http';
import { DeptModule } from './dept/dept.module';
import { ErrorsModule } from './Core/errors/errors.module';
import { NotificationService } from './Core/Service/notification-service/notification.service';


@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProductModule,
    EmpModule,
    UserLoginModule,
    SignalRDemoModule,
    DeptModule,
    ErrorsModule,
    AppRoutingModule
    
    
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
