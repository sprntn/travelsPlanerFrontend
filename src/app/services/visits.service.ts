import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Visit } from '../models/visit';
import { VisitedSite } from '../models/visitedSite';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  //temp
  //private userEmail: String = "string2";

  private apiURL = baseUrl + 'visits/';

  constructor(private http_client: HttpClient) { }

  getVisitedSites(userEmail: string): Observable<VisitedSite[]>{
    //the server will receive the user email from the token
    //return this.http_client.get<VisitedSite[]>(this.apiURL + 'getUserVisitedSites/');//.pipe()
    //temp
    
    return this.http_client.get<VisitedSite[]>(this.apiURL + 'getVisitedSitesByEmail/' + userEmail);//.pipe()
  }

  updateVisitRating(visit: Visit): Observable<Visit> {//visit.userEmail is empty, the server will receive the user email from the token
    console.log("updating visit rating");
    return this.http_client.put<Visit>(this.apiURL + "updateRating/", visit);//.pipe()
  }

  updateVisitDatetime(visit: Visit): Observable<Visit>{
    console.log("updatting visit datetime, visit" + JSON.stringify(visit));
    return this.http_client.put<Visit>(this.apiURL + "updateVisitDatetime",visit);
  }

  //addVisit(visit: Visit): Observable<Visit>{
  addVisit(visit: Visit): Observable<number>{
    console.log("adding visit to travel " + JSON.stringify(visit));
    //return this.http_client.post<Visit>(this.apiURL + "addVisit", visit);
    return this.http_client.post<number>(this.apiURL + "addVisit", visit);
  }

  deleteVisit(visitId: number): Observable<number>{
    console.log("deleting visit: " + visitId);
    return this.http_client.delete<number>(this.apiURL + "deleteVisitById/" + visitId);
  }
}
