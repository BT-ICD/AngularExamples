import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataConstantsService } from './app-constants/data-constants.service';
import { ILoginModel, ITokenModel } from '../Types/login-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  authenticateUser(loginModel:ILoginModel):Observable<ITokenModel>{
    const url:string = this.dataConstantsService.BASEAPIURL + this.dataConstantsService.login;
    return this.http.post<ITokenModel>(url,loginModel);
  }
}
