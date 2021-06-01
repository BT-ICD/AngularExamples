import { Injectable } from '@angular/core';
import { ITokenModel } from '../../Types/login-type';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  isAuthenticated:boolean;
  private _userToken: ITokenModel;
  public get userToken(): ITokenModel {
    return this._userToken;
  }
  public set userToken(value: ITokenModel) {
    this._userToken = value;
    if(value){
      this.isAuthenticated =true;
      localStorage.setItem('tokenObj',JSON.stringify(value));
    }
    else{
      this.isAuthenticated=false;
      localStorage.removeItem('tokenObj')
    }
  }
  private _userName: string;
  public get userName(): string {
    return this._userName;
  }
  public set userName(value: string) {
    this._userName = value;
    if(value && value!='')
      localStorage.setItem('userName',value);
    else
      localStorage.removeItem('userName');
  }

  constructor() {
    this.initializeTokenandUserFromLocalStorage();
   }
   /* To initialize user name, token from local storage. This is useful when user refresh application page, so we can initialize username and token from local storage. */
  initializeTokenandUserFromLocalStorage():void{
    if(localStorage.getItem('userName')){
      this._userName=localStorage.getItem('userName');
    }
    if(localStorage.getItem('tokenObj')){
      this._userToken= JSON.parse( localStorage.getItem('tokenObj'));
      this.isAuthenticated =true;
    }
   
  }
}
