import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { GetLoggedUserService } from '../cros-components-services/get-logged-user.service';
import { ManagerSite } from '../models/managerSite';
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

  /**
   * 
   * @returns deleteVisit(visitId: number): Observable<number>{
    console.log("deleting visit: " + visitId);
    return this.http_client.delete<number>(this.apiURL + "deleteVisitById/" + visitId);
  }
   */

  deleteSite(siteId: number) : Observable<boolean>{
    return this.http_client.delete<boolean>(this.apiURL + "deleteSite/" + siteId);
  }

  getSharedSites():  Observable<Site[]>{
    console.log("getting sites");
    return this.http_client.get<Site[]>(this.apiURL + "getTopSites/").pipe(catchError(this.handleAuthError));
  }

  getUserSites(userEmail: string): Observable<Site[]>{
    console.log("getting user's sites");
    return this.http_client.get<Site[]>(this.apiURL + "getUserSites/" + userEmail).pipe(catchError(this.handleAuthError));
  }

  //original - working with server side property names
  // getManagerSites(managerEmail: string): Observable<Site[]>{
  // //getManagerSites(managerEmail: string): Observable<any>{
  //   console.log("getting manager's sites");
  //   return this.http_client.get<Site[]>(`${this.apiURL}getManagerSites/${managerEmail}`);
  // }

  getManagerSites(managerEmail: string): Observable<ManagerSite[]>{
    return this.http_client.get<{
      imageSource: string, 
      mainCategoryFK: number,
      siteAverageRating: number,
      siteDescription: string,
      siteId: number,
      siteName: string,
      webSite: string,
      managerEmail: string
    }[]>(`${this.apiURL}getManagerSites/${managerEmail}`).pipe(map(res => {
      const clientData = res.map((site) => ({
        imageSource : site.imageSource,
        mainCategoryId: site.mainCategoryFK,
        siteAverageRating: site.siteAverageRating,
        siteDescription: site.siteDescription,
        siteId: site.siteId,
        siteName: site.siteName,
        webSite: site.webSite,
        managerEmail: site.managerEmail
      }))
      return clientData;
    }));
  }

  getManagerSites_v1working(managerEmail: string): Observable<ManagerSite[]>{
    return this.http_client.get<any>(`${this.apiURL}getManagerSites/${managerEmail}`).pipe(
      map(res => {
        const clientData = res.map((site: { 
          imageSource: string, 
          mainCategoryFK: number,
          siteAverageRating: number,
          siteDescription: string,
          siteId: number,
          siteName: string,
          webSite: string,
          managerEmail: string
         }) => {
          const managerSite: ManagerSite = {
            imageSource : site.imageSource,
            mainCategoryId: site.mainCategoryFK,
            siteAverageRating: site.siteAverageRating,
            siteDescription: site.siteDescription,
            siteId: site.siteId,
            siteName: site.siteName,
            webSite: site.webSite,
            managerEmail: site.managerEmail
          }
          return managerSite;
        }
        );
        return clientData;
      })
    );
  }

  //getting user's sites by token
  getUserSitesByToken(): Observable<Site[]>{
    return this.http_client.get<Site[]>(this.apiURL + "getUserSites").pipe(catchError(this.handleAuthError));
  }

  getCategories() : Observable<siteCategory[]>{//להשלים נתיב
    return this.http_client.get<siteCategory[]>(this.apiURL + "getCategories");//.pipe()...
  }

  updateSite(upSite: ManagerSite){
    console.log("updating reference: \n" + upSite);
    return this.http_client.put<ManagerSite>(this.apiURL + 'updateSite', upSite).pipe(catchError(this.handleSiteError));
  }

  //addSite(newSite: ManagerSite){
  addSite(newSite: any){
    console.log(`new site: ${JSON.stringify(newSite)}`);
    //return this.http_client.post<ManagerSite>(this.apiURL + 'addSite', newSite).pipe(catchError(this.handleSiteError));
  }

  private handleSiteError(error: HttpErrorResponse){
    return throwError(() => new Error('some error'))
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
