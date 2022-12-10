import { Component, OnInit } from '@angular/core';
import { GetTravelDetailsService } from 'src/app/cros-components-services/get-travel-details.service';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.scss']
})
export class AddTravelComponent implements OnInit {

  public travelId: number = 0;
  
  constructor(private getTravelDetailsService : GetTravelDetailsService, private travelsService: TravelsService) { }

  ngOnInit(): void {
    this.getTravelDetailsService.travelDetailsSubject$.subscribe({
      next: (travel) => {
        this.travelsService.addTravel(travel).subscribe({
          next: (res) => {
            this.travelId = res;
            //navigate to edit page then play travelIdSubject 
          },
          error: () => {},
          complete: () => {}
        });
      },
      error: () => {},
      complete: () => {}
    })
  }

}
