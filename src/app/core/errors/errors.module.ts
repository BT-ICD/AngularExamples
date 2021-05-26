import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorsInterceptorService } from './server-errors-interceptor/server-errors-interceptor.service';
import { GlobalErrorHandlerService } from './errors-handler/global-error-handler.service';



@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path:'errorpage',
        component:ErrorPageComponent
      }
    ])
  ],
  providers:[
    {provide:ErrorHandler, useClass:GlobalErrorHandlerService},
    {provide:HTTP_INTERCEPTORS, useClass:ServerErrorsInterceptorService, multi:true}
  ]
})
export class ErrorsModule { }
