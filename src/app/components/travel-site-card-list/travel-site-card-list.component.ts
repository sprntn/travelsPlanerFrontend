import { Component, Input, OnInit } from '@angular/core';
import { GetVisitService } from 'src/app/cros-components-services/get-visit.service';
import { SelectedSite } from 'src/app/models/selectedSite';
import { Site } from 'src/app/models/site';
import { Travel } from 'src/app/models/travel';

@Component({
  selector: 'app-travel-site-card-list',
  templateUrl: './travel-site-card-list.component.html',
  styleUrls: ['./travel-site-card-list.component.scss']
})
export class TravelSiteCardListComponent implements OnInit {

  //@Input() public travelSites:  { site: Site; dateTime: Date; } [] | undefined;
  @Input() public travelSites:  SelectedSite[] = [];// | undefined;
  @Input() public travel!: Travel;

  constructor(private getVisitService: GetVisitService) { }

  ngOnInit(): void {
    this.getVisitService.selectedSitesSubject$.subscribe({
      next: (site) => {
        console.log("site received: " + JSON.stringify(site));
        this.travelSites.push(site);
      },
      error: () => {},
      complete: () => {}
    });
  }

  removeVisit(visitId: number): void{
    console.log("removing visit: " + visitId);
    //remove visit from the visits list
    this.travelSites.forEach((value,index) => {
      if(value.visitId == visitId){
        this.travelSites.splice(index,1);
        console.log(`delete visit ${visitId} from travel visits`);
        return;
      }
    })
  }

  /**דוגמא למחיקה ממערך
   * deletePreference(id:number){
    this.preferencesList.forEach((value,index) => {
      //if(value.categoryId == id){
      if(value.categoryId == id){
        //this.usersService.deletePreference({userEmail: this.userEmail, categoryId: this.selectedCategoryId}).subscribe({});
        this.usersService.deletePreference(this.userEmail, id).subscribe({
          next: () => {
            this.preferencesList.splice(index,1);
            console.log("delete preference" + id);
            return;
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {}
        });
      }
    });
  }
   */

}
