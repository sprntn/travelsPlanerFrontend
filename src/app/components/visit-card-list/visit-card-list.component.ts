import { Component, Input, OnInit } from '@angular/core';
import { GetLoggedUserService } from 'src/app/cros-components-services/get-logged-user.service';
import { VisitedSite } from 'src/app/models/visitedSite';
import { SitesService } from 'src/app/services/sites.service';
import { VisitsService } from 'src/app/services/visits.service';
//import { VisitedSite } from '../../models/visitedSite';

@Component({
  selector: 'app-visit-card-list',
  templateUrl: './visit-card-list.component.html',
  styleUrls: ['./visit-card-list.component.scss']
})
export class VisitCardListComponent implements OnInit {

  @Input() public visitsList:  VisitedSite[] = [];
  //public currebtUserEmail!: string;

  constructor(private getLoggedUserService :GetLoggedUserService, private visitsService: VisitsService) { }

  ngOnInit(): void {

    /*
    console.log("visits list initialing");
    this.visitsService.getVisitedSites().subscribe({
      next: (visits) => {
        this.visitsList = visits;
        console.log("visit list: " + visits);
      },
      error: () => {},
      complete: () => {}
    });
    */
  }

}
