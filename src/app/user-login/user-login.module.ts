import { NgModule } from '@angular/core';
import { AppLoginComponent } from './app-login/app-login.component';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../Shared/shared-module/shared-module.module';



@NgModule({
  declarations: [AppLoginComponent],
  imports: [
    SharedModuleModule,
    RouterModule.forChild([
      {
        path:'login',
        component:AppLoginComponent
      }
    ])
  ]
})
export class UserLoginModule { }
