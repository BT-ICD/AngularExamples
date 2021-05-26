import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorNotificationService } from 'src/app/Shared/Services/error-notification.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorMessage: string;
  errorNotificationServiceSub:Subscription;
  constructor(private route:ActivatedRoute, private errorNotificationService:ErrorNotificationService) { }
  ngOnDestroy(): void {
    if(this.errorNotificationServiceSub)
      this.errorNotificationServiceSub.unsubscribe();
  }

  ngOnInit(): void {
    this.errorNotificationServiceSub= this.errorNotificationService.notification$.subscribe((data)=>this.setErrorMessageFromErrorNotification(data))
  }
  setErrorMessageFromErrorNotification(message:string){
    if(message){
      this.errorMessage=message;
    }
    
  }

}
