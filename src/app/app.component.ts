/**
 * Learning refereces:
 * https://rxjs.dev/api/index/function/fromEvent
 */
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { fromEvent, Subscription } from 'rxjs';
import { NotificationService } from './Core/Service/notification-service/notification.service';
import { SignalRService } from './core/Service/signalr-service/signal-r.service';
import { AuthDataService } from './Shared/Services/auth/auth-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MessageService]
})
export class AppComponent implements OnInit, OnDestroy {
  offLineEventSub:Subscription;
  onLineEventSub:Subscription;
  errorNotificationServiceSub:Subscription;
  constructor(private router:Router,private messageService:MessageService ,  private errorNotificationService:NotificationService, private ngZone:NgZone, private authDataService:AuthDataService, private signalRService:SignalRService) {}

  
  title = 'MyNgRxDemoApp';
  ngOnInit(): void {
    const offLineEvent = fromEvent(window,'offline');
    const  onLineEvent= fromEvent(window,'online');

    this.offLineEventSub= offLineEvent.subscribe((data)=>this.onOffline(data));
    this.onLineEventSub= onLineEvent.subscribe((data)=>this.onLine(data));
    this.errorNotificationService.notification$.subscribe((error)=>this.onError(error))
    console.log(this.authDataService.isAuthenticated);
    if(this.authDataService.isAuthenticated){
      console.log('SignalR connection started from app component');
      this.signalRService.startConnection();
    }
    this.signalRService.receivePrivateMessageSubject$.subscribe((privatemessage)=>this.onPrivateMessageReceived(privatemessage));

  }
  onPrivateMessageReceived(privateMessage:string):void{
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'+ privateMessage});

  }
  onOffline(data):void{
    console.log(data);
    this.errorNotificationService.notify('Internet connection is not available. Please check your connection and try again.');
      }
  onLine(data):void{
    console.log('online');
    console.log(data);
    // alert('Inernet connection online');
  }
  onError(error):void{
    console.log('on error from app component');
    console.log(error);
    if(error){
      // this.router.navigateByUrl('/errorpage');
      // this.router.navigate(['errorpage']);
      this.ngZone.run(()=> this.router.navigate(['/errorpage']));
    }
  }
  ngOnDestroy(): void {
    if (this.onLineEventSub)
      this.onLineEventSub.unsubscribe();
    if (this.offLineEventSub)
      this.offLineEventSub.unsubscribe();
    if(this.errorNotificationServiceSub){
      this.errorNotificationServiceSub.unsubscribe();
    }
  }
}
