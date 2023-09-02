import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {
  private apiURL = baseUrl + 'Managers/';
  
  constructor(private http_client: HttpClient) { }

  addManager(newManager: User){//A user has the same fields as a manager
    return this.http_client.post<User>(this.apiURL + 'addManager', newManager).pipe(catchError(this.handleUserError));
  }
  
  private handleUserError(error: HttpErrorResponse){
    return throwError(error);
  }
}
