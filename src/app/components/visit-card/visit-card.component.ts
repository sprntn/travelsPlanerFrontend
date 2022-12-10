import { Component, Input, OnInit } from '@angular/core';
import { Visit } from 'src/app/models/visit';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-visit-card',
  templateUrl: './visit-card.component.html',
  styleUrls: ['./visit-card.component.scss']
})
export class VisitCardComponent implements OnInit {

  currentRating = 0;
  
  hoverRating = 0;

  @Input() imageSource!: string;
  @Input() siteDescription!: string;
  //@Input() webSite!: string;
  @Input() siteName!: string;
  @Input() siteId!: number;
  @Input() userRating!: number;
  //@Input() travelId!: number;

  
  
  stars = [1,2,3,4,5];

  constructor(private visitService: VisitsService) { }

  ngOnInit(): void {
    this.currentRating = this.userRating;
  }

  onStarSelected(id: number): void{
    console.log("star selected: " + id);
    this.currentRating = id;
  }

  onStarHovered(id: number): void{
    console.log("star hovered: " + id);
    this.hoverRating = id;
  }

  onStarLeave(): void{
    console.log("star leave");
    this.hoverRating = 0;
  }

  updateRating(): void{//add visitid
    console.log("edit rating");//user email temporary hardcoded, needs to be retrieved from the token
                                                   //temp
    this.visitService.updateVisitRating({siteId:this.siteId,rating:this.currentRating, travelId: 0, datetime: new Date(0), visitId: 0}).subscribe({
    //this.visitService.updateVisitRating({siteId:this.siteId,rating:this.currentRating, travelId: 0, datetime: "", visitId: 0}).subscribe({
      next: () => {
        this.userRating = this.currentRating;
      },
      error: () => {},
      complete: () => {}
    });
  }

}
