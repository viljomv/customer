import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // public regex = {
  //   user:("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  // }
   formErrors :any= {

   };
   
  getValidationErrors(group: FormGroup, validationMessages: any): any {

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid ) {

        const messages = validationMessages[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
           this. formErrors[key] += messages[errorKey] + '';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        let groupError = this.getValidationErrors(abstractControl, validationMessages);
       this. formErrors = { ...this.formErrors, ...groupError }
      }

    });
    return this.formErrors
  }


  }

