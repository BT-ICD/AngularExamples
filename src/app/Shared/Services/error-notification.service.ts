import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ErrorNotificationService {
private _notification:BehaviorSubject<string> = new BehaviorSubject(null);
readonly notification$: Observable<string> = this._notification.asObservable();
  constructor(private router:Router, private ngZone:NgZone) { }
  notify(message){
    this._notification.next(message);
    setTimeout(() => {
      this._notification.next(null)
    }, 3000);

    //this.router.navigate(['/errorpage']);
    this.ngZone.run(()=> this.router.navigate(['/errorpage']));
  }
  clearMessage():void{
    this._notification.next(null);
  }
}
