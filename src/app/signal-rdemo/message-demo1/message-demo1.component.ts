/** 
 * Learning references: 
 * https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-5.0
*/
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
messagefromClient:string;
user:string;
private _hubConnection:HubConnection;
  constructor() { }
//Without any parameters, withAutomaticReconnect() configures the client to wait 0, 2, 10, and 30 seconds respectively before trying each reconnect attempt, stopping after four failed attempts.
  ngOnInit(): void {
    this._hubConnection = new signalR.HubConnectionBuilder()
                          .withUrl('https://localhost:44342/messagehub')
                          .withAutomaticReconnect([0,1000,5000,10000])
                          .configureLogging(signalR.LogLevel.Trace)
                          .build();
    

    this._hubConnection.on('serverTime', (data)=>this.onMessageRetrieved(data));
    this._hubConnection.on('ReceiveMessage',(user, message)=>this.onMessageReceived(user,message));
    this._hubConnection.onclose(this.onConnectionClose)
    this._hubConnection.onreconnecting(this.onReconnecting);
    this._hubConnection.onreconnected(this.onReconntected);
    

    this._hubConnection
        .start()
        .then(()=>console.log('Connection Started'))
        .catch((err)=>console.log('Error while starting connection '+ err));
  }
  onMessageRetrieved(data):void{
    this.message = data;
    let date = new Date();
    console.log(date.toLocaleTimeString());
    console.log(this.message);

  }
  onMessageReceived(user, message){
    this.user = user;
    this.messagefromClient= message;
  }
  onConnectionClose(err?){
    console.log('Connection Closed');
    if(err){
      console.log('Error from onConnectionClose: ',err);
    }
  
  }
  async invokeServerMethod(){
    try{
      await this._hubConnection.invoke("SendMessage","Bhavin","Hello From Client " + (new Date().toTimeString()));
    }catch(err){
      console.log(err)
    }
  }
  onReconnecting(err?){
    console.log('onReconnecting');
    console.log('onReconnecting event executed', err);
  }
  onReconntected(connectionId?):void{
    console.log('onReconntected')
    console.log('onReconntected', connectionId);
  }
}