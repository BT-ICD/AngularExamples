import { NgModule } from '@angular/core';
import { DeptlistComponent } from './list/deptlist.component';
import { SharedModuleModule } from '../Shared/shared-module/shared-module.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DeptlistComponent],
  imports: [
    SharedModuleModule,
    RouterModule.forChild([
      {
        path:'deptlist',
        component:DeptlistComponent
      }
    ])
  ]
})
export class DeptModule { }
