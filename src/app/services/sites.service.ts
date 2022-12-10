import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { GetLoggedUserService } from '../cros-components-services/get-logged-user.service';
import { Site } from '../models/site';
import { siteCategory } from '../models/siteCategory';
//import { Site } from '../models/site';
//import { VisitedSite } from '../models/visitedSite';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  private apiURL = baseUrl + "Sites/";
  
  //public serviceSitesList: Site[] = [];

  constructor(private getLoggedUserService :GetLoggedUserService, private http_client: HttpClient) {}

  /*
  setSites() : void{
    console.log("sites service setting sites");
    this.getLoggedUserService.userEmailSubject$.subscribe((userEmail) => {
      if(userEmail == ""){//temp בהמשך צריך להוריד מחדש את הרשימה כל פעם והשרת יזהה את האמייל לפי הטוקן
        this.http_client.get<Site[]>(this.apiURL + "getSites").subscribe({
          next: (sites) => {
            this.serviceSitesList = sites;
          },
          error: () => {},
          complete: () => {}
        });
      }
      else{
        this.http_client.get<Site[]>(this.apiURL + "getUserSites/" + userEmail).subscribe({
          next: (sites) => {
            this.serviceSitesList = sites;
          },
          error: () => {},
          complete: () => {}
        });
      }
    });
  }
  */

  getSharedSites():  Observable<Site[]>{
    console.log("getting sites");
    return this.http_client.get<Site[]>(this.apiURL + "getTopSites/").pipe(catchError(this.handleAuthError));
  }

  getUserSites(userEmail: string): Observable<Site[]>{
    console.log("getting user's sites");
    return this.http_client.get<Site[]>(this.apiURL + "getUserSites/" + userEmail).pipe(catchError(this.handleAuthError));
  }

  //getting user's sites by token
  getUserSitesByToken(): Observable<Site[]>{
    return this.http_client.get<Site[]>(this.apiURL + "getUserSites").pipe(catchError(this.handleAuthError));
  }

  getCategories() : Observable<siteCategory[]>{//להשלים נתיב
    return this.http_client.get<siteCategory[]>(this.apiURL + "getCategories");//.pipe()...
  }

  

  private handleAuthError(error: HttpErrorResponse){
    switch(error.status){
      case 0:
        console.error('An error occurred:', error.error);
        return throwError(() => new Error('A client-side or network error occurred. please try again later.'));
      case 401:
        console.error('An error occurred:', error.error);
        return throwError(() => new Error('you are unauthorized'));
      default:
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }
}
