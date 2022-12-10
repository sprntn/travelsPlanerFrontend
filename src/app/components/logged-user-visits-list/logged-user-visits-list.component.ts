import { Component, OnInit } from '@angular/core';
import { GetLoggedUserService } from 'src/app/cros-components-services/get-logged-user.service';
import { VisitedSite } from 'src/app/models/visitedSite';
import { VisitsService } from 'src/app/services/visits.service';

@Component({
  selector: 'app-logged-user-visits-list',
  templateUrl: './logged-user-visits-list.component.html',
  styleUrls: ['./logged-user-visits-list.component.scss']
})
export class LoggedUserVisitsListComponent implements OnInit {

  public visitsList:  VisitedSite[] = [];
  public currentUserEmail: string = "";
  
  constructor(private visitsService: VisitsService) { }

  ngOnInit(): void {
    const email = localStorage.getItem("userEmail");
    if(email != null){
      this.currentUserEmail = email;
    }
    this.visitsService.getVisitedSites(this.currentUserEmail).subscribe({
      next: (visits) => {
        this.visitsList = visits;
      },
      error: () => {},
      complete: () => {}
    });
    /*
    this.getLoggedUserService.userEmailSubject$.subscribe({
      next: (userEmail) => {
        this.currentUserEmail = userEmail;

        this.visitsService.getVisitedSites(this.currentUserEmail).subscribe({
          next: (visits) => {
            this.visitsList = visits;
          },
          error: () => {},
          complete: () => {}
        });
      },
      error: () => {},
      complete: () => {}
    });
    */
  }

}
