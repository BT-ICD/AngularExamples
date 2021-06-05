import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SignalRService } from 'src/app/core/Service/signalr-service/signal-r.service';
import { IOnlineUser } from 'src/app/core/types/onlineuser-types';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
userList:IOnlineUser[];
onlineUserListSub:Subscription;

  constructor(private signalRService: SignalRService) { }
 

  ngOnInit(): void {
    this.onlineUserListSub= this.signalRService.onlineUserListSubject$.subscribe((data)=>this.onOnlineUserListRetrieved(data));
  }
  initializeColumns():void{
   
  }
  onOnlineUserListRetrieved(data:IOnlineUser[]){
    this.userList=data;
    console.log(this.userList);
  }
  ngOnDestroy(): void {
    if(this.onlineUserListSub)
      this.onlineUserListSub.unsubscribe();
  }
}
