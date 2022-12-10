import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appDateInRangeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateInRangeValidatorDirective,
    multi: true
  }]
})
export class DateInRangeValidatorDirective implements Validator{

  //@Input('startDate') startDate!: Date;
  @Input('startDate') startDate!: string;
  //@Input('endDate') endDate!: Date;
  @Input('endDate') endDate!: string;

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    console.log(this.startDate + "\t" + this.endDate);
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const date = new Date(control.value)
    console.log(start + "\t" + end);

    //if(control.value < start){
    if(date < start){
      console.log("date is too early");
      return { 'tooEarlyDate': true };
    }
    //if(control.value > end){
    if(date > end){
      console.log("date is too late");
      return {'tooLateDate': true};
    }
    return null;
    /*
    if(control.value >= start && control.value <= end){
      console.log("date valid");
      return null;
    }
    console.log("date invalid");
    return { 'dateInvalid': true };
    */
  }

}
