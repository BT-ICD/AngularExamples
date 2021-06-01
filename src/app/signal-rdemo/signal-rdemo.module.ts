import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDemo1Component } from './message-demo1/message-demo1.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MessageDemo1Component],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path:'messagedemo1',
        component:MessageDemo1Component
      }
    ])
  ]
})
export class SignalRDemoModule { }
