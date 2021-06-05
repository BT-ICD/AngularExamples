import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModuleModule } from '../Shared/shared-module/shared-module.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserListComponent],
  imports: [
    SharedModuleModule,
    RouterModule.forChild([
      {
        path:'userlist',
        component:UserListComponent
      }
    ])
  ]
})
export class OnlineUsersModule { }
