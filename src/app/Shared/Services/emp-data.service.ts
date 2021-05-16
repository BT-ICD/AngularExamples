import { Injectable } from '@angular/core';
import { IEmp } from '../Types/emp-type';

@Injectable({
  providedIn: 'root'
})
export class EmpDataService {
employees:IEmp[]=[
  {id:1001,name:'Rajesh',designation:'Sr. Software Engineer'},
  {id:1002,name:'Manan',designation:'Project Coordinator'},
  {id:1003,name:'Tapan',designation:'UI Designer'},
  {id:1004,name:'Miloni',designation:'Project Manager'},
]
  constructor() { }
  getList():IEmp[]{
    return this.employees;
  }
}
