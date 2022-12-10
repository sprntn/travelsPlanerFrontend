import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GetTravelIdService } from 'src/app/cros-components-services/get-travel-id.service';

@Component({
  selector: 'app-travel-card',
  templateUrl: './travel-card.component.html',
  styleUrls: ['./travel-card.component.scss']
})
export class TravelCardComponent implements OnInit {

  @Input() travelId:number = 0;

  @Output() deleteTravelOutput: EventEmitter<number> = new EventEmitter();
  @Output() editTravelOutput: EventEmitter<number> = new EventEmitter();

  constructor(private router: Router, private getTravelIdService: GetTravelIdService ) { }

  ngOnInit(): void {
  }

  openTravelPage(): void{
    console.log(`open travel ${this.travelId} page`);
    //navigate to edit pade then send the travelid
    //this.router.navigate(['main-page/edit-travel']); 
    //this.getTravelIdService. travelIdSubject$.next(this.travelId);

    this.router.navigate(['main-page/edit-travel', this.travelId]); 
  }

  deleteTravel(): void {
    console.log(`delete travel ${this.travelId}`);
    this.deleteTravelOutput.emit(this.travelId);
  }

  editTravel(): void{
    console.log(`edit travel ${this.travelId}`);
    this.editTravelOutput.emit(this.travelId);
  }
}
