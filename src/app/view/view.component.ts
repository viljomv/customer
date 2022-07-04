import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  showAdd!: boolean;
  showEdit!: boolean;
  id: any;
  dialogRef: any;
  firstname: any;


  postarray: any = [];
  constructor(private fb: FormBuilder, private route: Router, private validation: ValidationService, private api: ApiService,) { }
  ngOnInit(): void {
    this.api.getUser().subscribe(data => {
      this.postarray = data.Table
      console.log(data.Table);
    })
  }
  Addform = this.fb.group({
    title: ['', Validators.required], firstname: ['', Validators.required], middlename: ['', Validators.required],
    lastname: ['', Validators.required], age: ['', Validators.required], caddress: ['', Validators.required],
    ccity: ['', Validators.required], cdistrict: ['', Validators.required], cstate: ['', Validators.required],
    ccountry: ['', Validators.required], cpin: ['', Validators.required], paddress: ['', Validators.required],
    pcity: ['', Validators.required], pdistrict: ['', Validators.required], pstate: ['', Validators.required],
    pcountry: ['', Validators.required], ppin: ['', Validators.required], occupation: ['', Validators.required],
    experience: ['', Validators.required], idproof: ['', Validators.required], idnumber: ['', Validators.required],
    addrerssproof: ['', Validators.required], details: ['', Validators.required],
  })
  validationMessages = {
    'title': { 'required': 'title is required', }, 'firstname': { 'required': 'first name is required' }, 'middlename': { 'required': 'middile name is required' },
    'lastname': { 'required': 'last name is required' }, 'age': { 'required': ' age is required' }, 'caddress': { 'required': ' address is required' },
    'ccity': { 'required': ' city is required' }, 'cdistrict': { 'required': ' district is required' }, 'cstate': { 'required': ' state is required' },
    'ccountry': { 'required': ' country is required' }, 'cpin': { 'required': ' pin is required' }, 'paddress': { 'required': ' address is required' },
    'pcity': { 'required': ' city is required' }, 'pdistrict': { 'required': ' district is required' }, 'pstate': { 'required': ' state is required' },
    'pcountry': { 'required': ' country is required' }, 'ppin': { 'required': ' pin is required' }, 'occupation': { 'required': ' occupation is required' },
    'experience': { 'required': ' experience is required' }, 'idproof': { 'required': ' id proof is required' }, 'idnumber': { 'required': ' id  number is required' },
    'addrerssproof': { 'required': ' id  number is required' }, 'details': { 'required': ' Address proof is required' },
  };
  formErrors = {
    title: '', firstname: '', middlename: '', lastname: '', age: '', caddress: '', ccity: '', cdistrict: '', cstate: '', ccountry: '', cpin: '',
    paddress: '', pcity: '', pdistrict: '', pstate: '', pcountry: '', ppin: '', occupation: '', experience: '', idproof: '',
    idnumber: '', addrerssproof: '', details: '',
  };

  logValidationErrors() {
    this.formErrors = this.validation.getValidationErrors(this.Addform, this.validationMessages)
  }
  edit(item: any) {
    this.showAdd = false;
    this.showEdit = true;
    this.id = item.customerid
    this.Addform.controls['title'].setValue(item.title), this.Addform.controls['firstname'].setValue(item.firstname),
      this.Addform.controls['middlename'].setValue(item.middlename), this.Addform.controls['lastname'].setValue(item.lastname),
      this.Addform.controls['age'].setValue(item.age), this.Addform.controls['caddress'].setValue(item.caddress),
      this.Addform.controls['ccity'].setValue(item.ccity), this.Addform.controls['cdistrict'].setValue(item.cdistrict),
      this.Addform.controls['cstate'].setValue(item.cstate), this.Addform.controls['ccountry'].setValue(item.ccountry),
      this.Addform.controls['cpin'].setValue(item.cpin), this.Addform.controls['paddress'].setValue(item.paddress),
      this.Addform.controls['pcity'].setValue(item.pcity), this.Addform.controls['pcity'].setValue(item.pcity),
      this.Addform.controls['pdistrict'].setValue(item.pdistrict), this.Addform.controls['pstate'].setValue(item.pstate),
      this.Addform.controls['pcountry'].setValue(item.pcountry), this.Addform.controls['ppin'].setValue(item.ppin),
      this.Addform.controls['occupation'].setValue(item.occupation), this.Addform.controls['experience'].setValue(item.experience),
      this.Addform.controls['idproof'].setValue(item.idproof), this.Addform.controls['idnumber'].setValue(item.idnumber),
      this.Addform.controls['addrerssproof'].setValue(item.addrerssproof), this.Addform.controls['details'].setValue(item.details)
    console.log("fdfgh", this.Addform.value);
  }

  adding() {
    this.Addform.reset()
    this.showAdd = true
    this.showEdit = false
  }
  add() {
    if (this.Addform.valid) {
      this.api.addUser(this.Addform.value).subscribe({
        next: (res) => {
          alert("added sucessfully")
          this.Addform.reset();
        },
        error: () => {
          alert("error while adding th form")
          let exits = document.getElementById('exit')
      exits?.click()
        }
      })
      
      window.location.reload();
      this.logValidationErrors()
    }
  }
 
  update() {
    if (this.Addform.valid) {
      this.api.putUser(this.Addform.value, this.id).subscribe((result) => {
        console.log(result);
        alert("updated succesfully")
        this.Addform.reset();
        let ref = document.getElementById("cancel")
        ref?.click();
      })
      window.location.reload();
    }
    else {
      alert("invalid form")
    }
  }
  deleteUser(item: any) {
    let idd = item.customerid
    this.api.deleteUser(idd).subscribe((result) => {
      alert("delete succesfully")
      window.location.reload();
    })

  }
  logOut()
{
  this.route.navigate(['/login'])
}
}

