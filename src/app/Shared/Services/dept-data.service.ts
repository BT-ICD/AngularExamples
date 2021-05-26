import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDept } from '../Types/idept-type';
import { DataConstantsService } from './app-constants/data-constants.service';

@Injectable({
  providedIn: 'root'
})
export class DeptDataService {

  constructor(private http:HttpClient, private dataConstantsService:DataConstantsService) { }
  getList():Observable<IDept[]>{
    const url:string = this.dataConstantsService.BASEAPIURL + this.dataConstantsService.DEPT_GETLIST;
    return this.http.get<IDept[]>(url);
  }
}
