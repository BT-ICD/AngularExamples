import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../Service/notification-service/notification.service';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector:Injector) { }
  handleError(error: Error | HttpErrorResponse) {
    const notificationService = this.injector.get(NotificationService);
    const router = this.injector.get(Router);
    console.error(error);
    if(error instanceof HttpErrorResponse){
      if(!navigator.onLine){

        return notificationService.notify('No internet connection');
        
      }
      return notificationService.notify(`${error.status} - ${error.message}`);
    }
    else{
      let message = error.message?error.message:error.toString();
      return notificationService.notify(`${message}`);
    }
   
  }
}
