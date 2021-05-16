import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.css']
})
export class EmpEditComponent implements OnInit {
  empForm:FormGroup;
  constructor(private fb:FormBuilder) { console.log('Emp Edit constructor');}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.empForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      designation:['',Validators.required]
    })
  }
  onSubmit():void{
    console.log('Emp Form submitted')
    console.log(this.empForm.value);
  }
}
