import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validationMessages ={
    'name':{
      'required':'Your name  is required',
    },
    'user':{
      'required':'user id  is required',
    },
      'password':{
        'required':'password is required'
      },
      // 'repeatpassword':{
      //   'required':'repeat password is required'
      // }

    
  };
  
  formErrors={name:'',user:'',password:'',repeatpassword:''};

  registerForm = this.fb.group({
    name:['',Validators.required],
    user:['',Validators.required],
    password:['',Validators.required,],
    // repeatpassword:['',Validators.required],
  })
  logValidationErrors(){
    this.formErrors=this.validation.getValidationErrors(this.registerForm,this.validationMessages)
  }
  register (){
    console.log('data', this.registerForm.value);
    //  if(this.registerForm.valid){
    //    alert(" register successfully")
    //    this.route.navigateByUrl("/login")
    //  }
    //  else{
    //   alert("invalid  register form")
    //   }
      this.logValidationErrors()
      if(this.registerForm.valid){
      this.http.post<any>("http://localhost:3000/posts",this.registerForm.value).subscribe((res)=>{
          alert(" register successfully")
          this.route.navigateByUrl("/login")
      })
        }
        
      
        else{
         alert("invalid  register form")
         }
     
  
     
   
    }

  constructor(private fb:FormBuilder,private route:Router,private validation:ValidationService ,private http:HttpClient) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(
      value=>{
        this.logValidationErrors()
      }
    );
  
  }
  }




