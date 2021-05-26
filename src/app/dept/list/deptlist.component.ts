import { Component, OnInit } from '@angular/core';
import { DeptDataService } from 'src/app/Shared/Services/dept-data.service';
import { IDept } from 'src/app/Shared/Types/idept-type';

@Component({
  selector: 'app-deptlist',
  templateUrl: './deptlist.component.html',
  styleUrls: ['./deptlist.component.css']
})
export class DeptlistComponent implements OnInit {
deptlist:IDept[];
length:number;
  constructor(private DeptDataService:DeptDataService) { }

  ngOnInit(): void {
    console.log('Dept List');
    this.loadData();
  }
  loadData():void{
    this.DeptDataService.getList().subscribe((data)=>{
      this.deptlist = data;
      this.length = data.length;
    })
  }
  onErrorButtonClick():void{
    let foo :IDept;
    let data = foo.id;
    console.log('onErrorButtonClick event raised');
  }
}
