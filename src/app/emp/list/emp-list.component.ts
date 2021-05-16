import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EmpDataService } from 'src/app/Shared/Services/emp-data.service';
import { IEmp } from 'src/app/Shared/Types/emp-type';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
empList:IEmp[];
selectedEmp:IEmp;
  constructor(private empDataService:EmpDataService,  private router:Router ) {
    console.log('Emplist constructor');
   }

  ngOnInit(): void {
    console.log('Emplist Oninit' );
    this.empList= this.empDataService.getList();
  }
  
  onRowSelect(data:IEmp):void{
    this.selectedEmp = data

  }
  onRowUnselect(data:IEmp):void{
    this.selectedEmp = null;
  }
  edit():void{
    this.router.navigate(['empedit']);
  }

}
