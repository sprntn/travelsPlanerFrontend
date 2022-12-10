import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetVisitService } from 'src/app/cros-components-services/get-visit.service';
import { SelectedSite } from 'src/app/models/selectedSite';
import { UsersService } from 'src/app/services/users.service';
import { VisitsService } from 'src/app/services/visits.service';
//import { EventEmitter } from 'stream';

@Component({
  selector: 'app-site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss']
})
export class SiteCardComponent implements OnInit {

  currentRating = 0;//the rating selected by the user
  hoverRating = 0;
  //public siteRating: number = 4;//for now, need to update from the server
  
  @Input() imageSource!: string;
  @Input() siteDescription!: string;
  @Input() webSite!: string;
  @Input() siteName!: string;
  @Input() siteId!: number;
  @Input() siteAverageRating!: number;

  @Input() userEmail!: string;
  @Input() travelId!: number;
  @Input() isUserLogged!: boolean;
  @Input() isTravelOpen!: boolean;

  @Input() startTravelDate!: Date;
  @Input() endTravelDate!: Date;

  @Output() removeSiteFromList: EventEmitter<number> = new EventEmitter();
  
  //public siteRating: number = this.siteAverageRating;
  //public siteRating: number = 0;

  public visitDatetime!: Date;

  stars = [1,2,3,4,5];

  constructor(private usersService: UsersService, private visitsService: VisitsService, private getVisitService: GetVisitService) { }

  ngOnInit(): void {
  }

  removeSite(siteId: number): void{
    console.log("removing site" + siteId);
    this.removeSiteFromList.emit(this.siteId);
  }

  addSiteToSelectedList(visitId: number): void{
    console.log("adding site to selected sites list " + this.siteId + "visit id: " + visitId);
    
    this.getVisitService.selectedSitesSubject$.next(<SelectedSite>{
      imageSource: this.imageSource,
      siteDescription: this.siteDescription,
      siteId: this.siteId,
      siteName: this.siteName,
      //להוסיף
      datetime: this.visitDatetime,//new Date(),
      visitId: visitId,
      webSite: this.webSite
    });
  }

  addVisitToTravel(): void{
    console.log("add site" + this.siteId);
    this.visitsService.addVisit({
      siteId: this.siteId, 
      travelId: this.travelId, 
      rating: 0, visitId: 0, 
      datetime: this.visitDatetime//new Date(0)
      //datetime: this.visitDatetime.toString()
    }).subscribe({
      next: (visitId) => {
        this.addSiteToSelectedList(visitId);
        this.removeSite(this.siteId);
      },
      error: () => {},
      complete: () => {}
    });
  }

  deleteSiteFromList(): void{
    console.log("delete site " + this.siteId);
    this.removeSite(this.siteId);
  }

  submitRating(): void {
    console.log("selected rating: " + this.siteAverageRating);
    //this.usersService.addRating(this.siteId, this.userEmail, this.currentRating).subscribe({
    this.usersService.addRating(this.siteId, this.userEmail, this.siteAverageRating).subscribe({
      next: () => {
        //console.log("rating updated to " + this.currentRating);
        console.log("rating updated to " + this.siteAverageRating);
        //this.siteAverageRating = this.currentRating;
        //this.currentRating = this.siteAverageRating;
      },
      error: () => {},
      complete: () => {}
    });
  }



  noUserLoggedStarSelected(id: number): void{
    console.log("not logged user selected star: " + id);
    this.currentRating = id;
  }

  userLoggedStarSelected(id: number): void{
    console.log("logged user selected star: " + id);
    this.siteAverageRating = id;
  }

  onStarHovered(id: number): void{
    console.log("star hovered: " + id);
    this.hoverRating = id;
  }

  onStarLeave(): void{
    console.log("star leave");
    this.hoverRating = 0;
  }
}
