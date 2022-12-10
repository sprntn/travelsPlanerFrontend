import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit {

  @Input() rating: number = 0;  
  @Input() hover: number = 0;  
  @Input() starId!: number;
  
  @Output() starSelected: EventEmitter<number> = new EventEmitter();//to set rating star
  @Output() starHovered: EventEmitter<number> = new EventEmitter();//to mark rating star when mouse hover
  @Output() starLeave: EventEmitter<number> = new EventEmitter();//to set back after mouse hover

  constructor() { }

  ngOnInit(): void {
  }

  onMouseEnter(): void{
    this.starHovered.emit(this.starId);
  }

  onMouseLeave(): void{
    this.starLeave.emit();
  }

  onStarSelected(): void{
    this.starSelected.emit(this.starId - +(this.rating == this.starId));
  }
}
