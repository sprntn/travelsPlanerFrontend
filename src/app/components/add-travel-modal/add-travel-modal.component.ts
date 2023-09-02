import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetTravelDetailsService } from 'src/app/cros-components-services/get-travel-details.service';
import { GetTravelIdService } from 'src/app/cros-components-services/get-travel-id.service';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-add-travel-modal',
  templateUrl: './add-travel-modal.component.html',
  styleUrls: ['./add-travel-modal.component.scss']
})
export class AddTravelModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  //@Output() travelAddedEvent = new EventEmitter<JSON>();
  
  public newTravelForm !: FormGroup;

  //public travelId: number = 0;
  @Input() travelId: number = 0;

  @Input() title!: string;

  public currentUserEmail: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder, 
    private customValidator: CustomValidatorService, 
    private travelsService: TravelsService,
    //private getTravelDetailsService : GetTravelDetailsService,
    //private getTravelIdService: GetTravelIdService 
    ) { }

  //get over18num() { return this.newTravelForm.get('over18num'); }
  //get upTo18num() { return this.newTravelForm.get('upTo18num'); }
  get participantsNum() {return this.newTravelForm.get('participantsNum')}
  get beginDate() {return this.newTravelForm.get('beginDate')}
  get endDate() {return this.newTravelForm.get('endDate')}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem("userEmail")??"";
    this.initializeForm();
  }

  initializeForm(): void {
    this.newTravelForm = this.formBuilder.group({
      //over18num: [2],
      //upTo18num: [0],
      //under3num: [0]

      //participantsNum: [2,{ validaors: [this.customValidator.minParticipants()]}],
      participantsNum: [2, [this.customValidator.minParticipants()]],
      // //beginDate: [,{Validators: [this.customValidator.dateAlreadyPassed('beginDate')]}],
      // beginDate: [,[this.customValidator.dateAlreadyPassed()]],
      // //endDate: [,{Validators: [this.customValidator.dateAlreadyPassed('endDate')]}]
      // endDate: [,[this.customValidator.dateAlreadyPassed()]]

      //endDate: [null, [Validators.required, this.customValidator.dateAlreadyPassed()]],
      endDate: [null, [Validators.required]],
      //beginDate: [null, [Validators.required, this.customValidator.dateAlreadyPassed(), this.customValidator.demoValidator()]]
      beginDate: [null, [Validators.required]]
      
    },
    {
      //validator: this.customValidator.minParticipants('over18num', 'upTo18num')
      //validator: this.customValidator.minParticipants('participantsNum')
      //validator: this.customValidator.beginBeforeEndDates()
    });
  }

  submit(form: any){
    //console.log(this.newTravelForm.value['over18num']);
    console.log(this.newTravelForm.value);
    console.log(form.value);
    const travel = this.newTravelForm.value;
    if(this.travelId == 0){//add new travel
      travel.userEmail = this.currentUserEmail;
      this.travelsService.addTravel(travel).subscribe({
        next: (res) => {
          this.travelId = res;
          
          //this.router.navigate(['main-page/edit-travel']); 
          this.router.navigate(['main-page/edit-travel', this.travelId]); 
          //this.getTravelIdService. travelIdSubject$.next(this.travelId);
        },
        error:  () => {},
        complete: () => {}
      });
    }else{//edit exist travel
      travel.travelId = this.travelId;
      this.travelsService.editTravel(travel).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {}
      });
    }

    this.closeMe();
    
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  anyClick(event: any){
    if(event.target.nodeName === 'SECTION'){//להשלים ניקוי
      this.closeMeEvent.emit();
    }
  }
}
