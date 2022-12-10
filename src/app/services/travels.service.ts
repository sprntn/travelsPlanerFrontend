import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { SelectedSite } from '../models/selectedSite';
import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  getTravelSites(travelId: number): Observable<SelectedSite[]> {
    return this.http_client.get<SelectedSite[]>(this.apiURL + "getTravelSites/" + travelId);
  }

  private apiURL = baseUrl + 'Travels/';

  constructor(private http_client: HttpClient) { }

  //addTravel(newTravel: Travel): Observable<Travel>{
  addTravel(newTravel: Travel): Observable<number>{
    //return this.http_client.post<Travel>(this.apiURL + "addTravel/", newTravel);
    //return this.http_client.post<Travel>(this.apiURL + "addEmptyTravel/", newTravel);
    return this.http_client.post<number>(this.apiURL + "addEmptyTravel/", newTravel);
  }

  editTravel(editTravel: Travel): Observable<boolean>{
    console.log("edit travel: " + editTravel.travelId);
    return this.http_client.put<boolean>(this.apiURL + "updateTravel/", editTravel);
  }

  getUserTravels(userEmail: string): Observable<Travel[]>{
    return this.http_client.get<Travel[]>(this.apiURL + "getUserTravels/" + userEmail);
  }

  getTravel(travelId: number): Observable<Travel>{
    return this.http_client.get<Travel>(this.apiURL + "getTravel/" + travelId);
  }

  deleteTravel(travelId: number){
    return this.http_client.delete(this.apiURL + "deleteTravel/" + travelId);
  }
}
