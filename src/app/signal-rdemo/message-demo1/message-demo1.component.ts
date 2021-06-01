
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignalRService } from 'src/app/core/Service/signalr-service/signal-r.service';
import { ReceivedMessageDTO } from 'src/app/core/types/signalr-message-types';

@Component({
  selector: 'app-message-demo1',
  templateUrl: './message-demo1.component.html',
  styleUrls: ['./message-demo1.component.css']
})
export class MessageDemo1Component implements OnInit, OnDestroy {
message:string;

sendMessage:string;
recMessage:ReceivedMessageDTO;
messageSub:Subscription;
receivedMessageSub:Subscription;
  constructor( private signalRService:SignalRService) { }
  
//Without any parameters, withAutomaticReconnect() configures the client to wait 0, 2, 10, and 30 seconds respectively before trying each reconnect attempt, stopping after four failed attempts.
  ngOnInit(): void {
    this.messageSub= this.signalRService.messageSubject$.subscribe((data)=> this.onMessageRetrieved(data));
    this.receivedMessageSub= this.signalRService.receivedMessageSubject$.subscribe((data)=> this.onMessageReceived(data));
    
  }
  onMessageRetrieved(data:string):void{
    console.log('From Message Demo Component Message retrieved From Signalr Service');
    this.message = data;
  }
  onMessageReceived(data:ReceivedMessageDTO){
    this.recMessage = data;
  }
  
  invokeServerMethod(message:string):void{
    this.signalRService.invokeServerMethod(message);
  }
  ngOnDestroy(): void {
    if(this.messageSub)
      this.messageSub.unsubscribe();
    if(this.receivedMessageSub)
      this.receivedMessageSub.unsubscribe();    
  }
}