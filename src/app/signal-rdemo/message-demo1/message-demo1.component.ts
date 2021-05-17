import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { HubConnection } from '@microsoft/signalr';
@Component({
  selector: 'app-message-demo1',
  templateUrl: './message-demo1.component.html',
  styleUrls: ['./message-demo1.component.css']
})
export class MessageDemo1Component implements OnInit {
message:string;
private _hubConnection:HubConnection;
  constructor() { }

  ngOnInit(): void {
    this._hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:44342/messagehub').build();
    this._hubConnection
        .start()
        .then(()=>console.log('Connection Started'))
        .catch((err)=>console.log('Error while starting connection '+ err));

    this._hubConnection.on('serverTime', (data)=>this.onMessageRetrieved(data))
  }
  onMessageRetrieved(data):void{
    this.message = data;
    let date = new Date();
    console.log(date.toLocaleTimeString());
    console.log(this.message);

  }
}