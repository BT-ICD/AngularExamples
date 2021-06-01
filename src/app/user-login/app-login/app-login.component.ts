import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalRService } from 'src/app/core/Service/signalr-service/signal-r.service';
import { AuthDataService } from 'src/app/Shared/Services/auth/auth-data.service';
import { UserLoginDataService } from 'src/app/Shared/Services/user-login-data.service';
import { ILoginModel, ITokenModel } from 'src/app/Shared/Types/login-type';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
  loginForm:FormGroup;
  errorMessage:string;
  loginModel:ILoginModel;

  constructor(private fb:FormBuilder,private signalRService:SignalRService, private authDataService:AuthDataService,  private userLoginDataService:UserLoginDataService, private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.loginForm= this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onSubmit():void{
    if(this.loginForm.valid){
      this.loginModel = Object.assign(this.loginForm.value);
      this.userLoginDataService.authenticateUser(this.loginModel).subscribe({
        next:(data)=>this.onLoginSuccess(data),
        error:(err)=> this.onLoginError(err)
      });
    }
  }
  onLoginSuccess(userToken:ITokenModel):void{
    console.log(JSON.stringify( userToken));
    this.errorMessage='';
    this.authDataService.userToken=userToken;
    this.authDataService.userName = this.loginModel.userName;
    /* Start SignalR Connection */
    console.log('SignalR connection started from login component');

    this.signalRService.startConnection();
    this.router.navigate(['/emp']);
  }
  onLoginError(err){
    if (err.status == 401) {
      this.errorMessage = 'Invalid user name or password. Please enter valid user name and password'
    }
    else {
      this.errorMessage = err.statusText;
    }
    this.authDataService.userToken=null;
    this.authDataService.userName='';
  }
}
