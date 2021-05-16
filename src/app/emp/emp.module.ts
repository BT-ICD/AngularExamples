import { NgModule } from '@angular/core';
import { EmpListComponent } from './list/emp-list.component';
import { EmpEditComponent } from './edit/emp-edit.component';
import { SharedModuleModule } from '../Shared/shared-module/shared-module.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [EmpListComponent, EmpEditComponent],
  imports: [
    SharedModuleModule,
    RouterModule.forChild([
      {path:'emp',        component:EmpListComponent      },
      {path:'empedit',        component:EmpEditComponent}
    ])
  ] 
})
export class EmpModule { }
