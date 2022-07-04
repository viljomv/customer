import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:any;
  

  constructor( private fb:FormBuilder,private route:Router,private validation:ValidationService, private http:HttpClient) { }
  validationMessages ={
    'user':{
      'required':'email is required',
    },
      'password':{
        'required':'password is required'
      }
    
  };

  formErrors={user:'',password:''};
    
  loginForm = this.fb.group({
    user:['',Validators.required],
    password:['',Validators.required]
  })

  logValidationErrors(){
    this.formErrors=this.validation.getValidationErrors(this.loginForm,this.validationMessages)
  }
login(){
  this.http.get<any>("http://localhost:3000/posts").subscribe((res:any)=>{
  const pro=res.find((a:any)=>{
  console.log("ajnasxmdkd",a.pro);
  return a.user===this.loginForm.value.user && a.password===this.loginForm.value.password
  });

  if(this.loginForm.valid){
  if(pro){
  alert("success");
  sessionStorage.setItem("currentusername",JSON.stringify(pro))
  sessionStorage.setItem("username",JSON.stringify(pro))
  this.route.navigateByUrl("/view")
  }
  else{
  alert("user not found")
  }
}
  else{
  alert("invalid form")
  }
  return pro
  })
  this.logValidationErrors()
  console.log(localStorage.getItem("username"));
  }

  ngOnInit():void {
    this.loginForm.valueChanges.subscribe(
      value=>{
        this.logValidationErrors()
      }
    );
  
  }
}
