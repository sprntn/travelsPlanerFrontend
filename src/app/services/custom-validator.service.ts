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

  isValidEmail(){
    return (control:AbstractControl) : ValidationErrors | null =>{
      const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(control.value)) {
        return { 'invalidEmail': true };
      }
      return null;
    }
  }

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
      //const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[^\da - zA - Z])');
      //const valid = regex.test(control.value);


      
      //const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      //const valid = !passwordPattern.test(control.value);
      
      const password = control.value;

      const hasCapitalLetter = /[A-Z]/.test(password);
      const hasSmallLetter = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

      const valid = !hasCapitalLetter || !hasSmallLetter || !hasDigit || !hasSpecialCharacter;

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

  imageUrlText(){
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const imgUrl = control.value.toLowerCase();
      const valid = urlPattern.test(control.value) && imageExtensions.some(ext => imgUrl.endsWith(ext)); 
      return valid? null: {imgUrlText:true}
    }
  }

  urlText(){
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      const valid = urlPattern.test(control.value);
      return valid? null: {urlText:true}
    }
  }

  //version 1 validator by the end of the form
  // minParticipants(participantsNum: string){
  //   return(formGroup: FormGroup) => {
  //     if(formGroup.controls[participantsNum].value == 0){
  //       formGroup.controls[participantsNum].setErrors({minParticipants: true});
  //     }
  //     else{
  //       formGroup.controls[participantsNum].setErrors(null);
  //     }
  //   }
  // }

  //version 2 validator for form controll
  minParticipants(){
    return (control:AbstractControl) : ValidationErrors | null => {
      const participantsValue = + control.value;
      if (participantsValue < 1) {
        return { minParticipants: true };
      }
      return null;
    }
  }

  dateAlreadyPassed(){
    return (control:AbstractControl) : ValidationErrors | null => {
      const selectedDate = control.value;
      const currentDate = new Date();
      if (selectedDate && selectedDate < currentDate){
        return {dateAlreadyPassed: true};
      }
      return null;
    }
  }

  beginBeforeEndDates(){
    return(formGroup: FormGroup) => {
      const beginDate = formGroup.controls['beginDate'];
      const endDate = formGroup.controls['endDate'];

      if(beginDate <= endDate){
        formGroup.controls['endDate'].setErrors({endBeforeStart: true});
      }
      else{
        formGroup.controls['endDate'].setErrors(null);
      }
    }
  }

  demoValidator(){
    return (control:AbstractControl) : ValidationErrors | null => {
      return {demoValidator: true}
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
