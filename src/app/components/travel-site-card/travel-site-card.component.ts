import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VisitsService } from 'src/app/services/visits.service';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-travel-site-card',
  templateUrl: './travel-site-card.component.html',
  styleUrls: ['./travel-site-card.component.scss']
})
export class TravelSiteCardComponent implements OnInit {

  @Input() imageSource!: string;
  @Input() siteDescription!: string;
  @Input() webSite!: string;
  @Input() siteName!: string;
  @Input() siteId!: number;
  @Input() visitId!: number;//check
  @Input() startTravelDate!: Date;
  @Input() endTravelDate!: Date;
  @Input() visitDate!: Date;

  @Output() removeVisit: EventEmitter<number> = new EventEmitter();
  
  public visitDatetime!: Date;

  constructor(private visitService: VisitsService) { }

  ngOnInit(): void {
  }

  updateVisitDatetime(): void{
    console.log("update visit date: " , this.visitDatetime);
    console.log("visit id:" + this.visitId);//test
    this.visitService.updateVisitDatetime({
      visitId: this.visitId, 
      datetime: this.visitDatetime, 
      //datetime: this.visitDatetime.toString(), 
      rating: 0, 
      siteId: 0,
      travelId: 0
    }).subscribe({
      next: () => {console.log("The date has been successfully updated");},
      error: () => {},
      complete: () => {}
    });
  }

  deleteVisit(): void{
    console.log("delete visit" + this.visitId);
    //delete visit on server side, then...
    this.visitService.deleteVisit(this.visitId).subscribe({
      next: () => {
        this.removeVisit.emit(this.visitId);
      },
      error: () => {},
      complete: () => {}
    })
  }
}
