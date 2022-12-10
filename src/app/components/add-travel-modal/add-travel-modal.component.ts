import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    private getTravelIdService: GetTravelIdService 
    ) { }

  //get over18num() { return this.newTravelForm.get('over18num'); }
  //get upTo18num() { return this.newTravelForm.get('upTo18num'); }
  get participantsNum() {return this.newTravelForm.get('participantsNum')}

  ngOnInit(): void {
    this.currentUserEmail = localStorage.getItem("userEmail")??"";
    this.initializeForm();
  }

  initializeForm(): void {
    this.newTravelForm = this.formBuilder.group({
      //over18num: [2],
      //upTo18num: [0],
      //under3num: [0]
      participantsNum: [2],
      beginDate: [],
      endDate: []
    },
    {
      //validator: this.customValidator.minParticipants('over18num', 'upTo18num')
      validator: this.customValidator.minParticipants('participantsNum')
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
    /*
    var newTravel = this.newTravelForm.value, tempTravel = JSON.parse(newTravel);
    tempTravel.userEmail = this.currentUserEmail;
    newTravel = JSON.stringify(tempTravel);
    */

    
    
    
    

    //console.log("with user email: " + newTravel);
    //navigate to travels page and open the travel received
    //console.log("open travel modal now");

    

    //test
    //this.travelAddedEvent.emit(newTravel);
    //this.router.navigate(['main-page/user-travel-page']);
    //this.router.navigate(['main-page/add-travel']);
    //this.getTravelDetailsService.travelDetailsSubject$.next(newTravel);

    

    /*
    //this.travelsService.addTravel(this.newTravelForm.value).subscribe({
    this.travelsService.addTravel(newTravel).subscribe({
      next: (travel) => {
        //navigate to travels page and open the travel received
        console.log("open travel modal now");

        this.travelAddedEvent.emit();
      },
      error: () => {},
      complete: () => {}
    });
    */
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
