import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  //emailValidator(email: string): ValidatorFn{
//
  //}
  passwordStrength(){
    return (control:AbstractControl) : ValidationErrors | null =>{
      /*
      console.log("break point here")
      const hasUpperCase = /[A-Z]+/.test(password);
      const hasLowerCase = /[a-z]+/.test(password);
      const hasNumeric = /[0-9]+/.test(password);
      const hasSpecial = /[^\da - zA - Z]+/.test(password);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

      return !passwordValid ? {passwordStrength:true}: null;
      */
      //@"^(?=.*[a - z])(?=.*[A - Z])(?=.*\d)(?=.*[^\da - zA - Z]).{ 8,20}$"
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[^\da - zA - Z])');
      const valid = regex.test(control.value);
      return valid? null: {passwordStrength:true}
    }
  }

  /*hardcoded
  passwordMatch(){
    return(formGroup: FormGroup)=>{
      if(formGroup.controls["password"].value !== formGroup.controls["confirmPassword"].value){
        formGroup.controls["confirmPassword"].setErrors({ passwordMismatch: true });
      }
      else{
        formGroup.controls["confirmPassword"].setErrors(null);
      }
    } 
  }
  */
  passwordMatch(password: string, confirmPassword: string){
    return(formGroup: FormGroup)=>{
      if(formGroup.controls[password].value !== formGroup.controls[confirmPassword].value){
        formGroup.controls[confirmPassword].setErrors({ passwordMismatch: true });
      }
      else{
        formGroup.controls[confirmPassword].setErrors(null);
      }
    } 
  }

  minParticipants(participantsNum: string){
    return(formGroup: FormGroup) => {
      if(formGroup.controls[participantsNum].value == 0){
        formGroup.controls[participantsNum].setErrors({minParticipants: true});
      }
      else{
        formGroup.controls[participantsNum].setErrors(null);
      }
    }
  }

  /*
  minParticipants(over18: string, upTo18: string){
    return(formGroup: FormGroup) => {
      if(formGroup.controls[over18].value == 0 && formGroup.controls[upTo18].value == 0){
        //formGroup.setErrors({minParticipants: true});//השגיאה רשומה בטופס ולא בשדה הספציפי
        formGroup.controls[over18].setErrors({minParticipants: true});
        formGroup.controls[upTo18].setErrors({minParticipants: true});
      }
      else{
        //formGroup.setErrors(null);
        formGroup.controls[over18].setErrors(null);
        formGroup.controls[upTo18].setErrors(null);
      }
    }
  }
  */
}
