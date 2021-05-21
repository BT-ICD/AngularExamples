import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataConstantsService {

  constructor() { }
  readonly BASEAPIURL: string = 'https://localhost:44342/api/'

  //Authenticate EndPoints
  readonly login:string = 'Authenticate/Login';
  
}
