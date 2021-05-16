import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
    
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class SharedModuleModule { }
