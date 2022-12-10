import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-rating-star',
  templateUrl: './no-rating-star.component.html',
  styleUrls: ['./no-rating-star.component.scss']
})
export class NoRatingStarComponent implements OnInit {

  
  //@Input() ratingPercent!: number;// = 0.0;
  @Input() isRated!: boolean;

  constructor() {
    //document.documentElement.style.setProperty('--opacity-color', 'rgba(0,255,0,'+this.ratingPercent+')');
   }

  ngOnInit(): void {
  }

}
