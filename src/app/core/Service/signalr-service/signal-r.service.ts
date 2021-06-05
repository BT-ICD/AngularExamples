/** 
 * Learning references: 
 * https://docs.microsoft.com/en-us/aspnet/core/signalr/javascript-client?view=aspnetcore-5.0
 * https://docs.microsoft.com/en-us/aspnet/core/signalr/authn-and-authz?view=aspnetcore-5.0
*/
import { Injectable } from '@angular/core';

import * as signalR from '@microsoft/signalr'
import { HubConnection } from '@microsoft/signalr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthDataService } from 'src/app/Shared/Services/auth/auth-data.service';
import { IOnlineUser } from '../../types/onlineuser-types';
import { ReceivedMessageDTO } from '../../types/signalr-message-types';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  message:string;
  messagefromClient:string;
  user:string;
  private _hubConnection: signalR.HubConnection;
  private readonly messageSubject = new Subject<string>();
  readonly messageSubject$ = this.messageSubject.asObservable();

  private readonly receivedMessageSubject = new Subject<ReceivedMessageDTO>();
  readonly receivedMessageSubject$ = this.receivedMessageSubject.asObservable();

  private readonly receivePrivateMessageSubject = new Subject<string>();
  readonly receivePrivateMessageSubject$ = this.receivePrivateMessageSubject.asObservable();

  private readonly onlineUserListSubject = new BehaviorSubject<IOnlineUser[]> (null);
  readonly onlineUserListSubject$ = this.onlineUserListSubject.asObservable();
  constructor(private authDataService: AuthDataService) { }
  startConnection = () => {
    if(this.authDataService.isAuthenticated){
      this._hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:44342/messagehub', { accessTokenFactory: () => this.authDataService.userToken.token })
        .withAutomaticReconnect([0, 1000, 5000, 10000])
        .configureLogging(signalR.LogLevel.Trace)
        .build();

      /* Start Connection */
      //Todo: To pass URL and Token as a parameter
      
      this._hubConnection
        .start()
        .then(() => console.log('Connection Started'))
        .catch((err) => console.log('Error while starting connection ' + err));

      /* Initialize methods to communicate with SignalR */
      this._hubConnection.on('serverTime', (data) => this.onMessageRetrieved(data));
      this._hubConnection.on('ReceiveMessage', (user, message) => this.onMessageReceived(user, message));
      this._hubConnection.on('onPrivateMessageReceived',(message)=>this.onPrivateMessageReceived(message));
      this._hubConnection.on('getOnlineUsers', (data)=>this.getOnlineUsers(data));

      this._hubConnection.onclose(this.onConnectionClose)
      this._hubConnection.onreconnecting(this.onReconnecting);
      this._hubConnection.onreconnected(this.onReconntected);
  }
  }
  getOnlineUsers(data:IOnlineUser[]){
    this.onlineUserListSubject.next(data);
    
  }
  onMessageRetrieved(data):void{
    this.message = data;
    this.messageSubject.next(this.message);
    let date = new Date();
    console.log(date.toLocaleTimeString());
    console.log(this.message);

  }
  onMessageReceived(user, message){
    this.user = user;
    this.messagefromClient= message;
    let data:ReceivedMessageDTO={user,message};
    this.receivedMessageSubject.next(data);
  }
  onPrivateMessageReceived(privateMessage:string):void{
   
    console.log('onPrivateMessageReceived', privateMessage);
    this.receivePrivateMessageSubject.next(privateMessage);
  }
  onConnectionClose(err?){
    console.log('Connection Closed');
    if(err){
      console.log('Error from onConnectionClose: ',err);
    }
  
  }
  async invokeServerMethod(message:string){
    try{
      await this._hubConnection.invoke("SendMessage",this.authDataService.userName,message + ' ' +(new Date().toTimeString()));
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
