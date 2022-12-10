import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { User } from '../models/user';
import { userPreferences } from '../models/userPreferences';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = baseUrl + 'Users/';
  
  constructor(private http_client: HttpClient) { }

  //addUser(newUser: User): Observable<User>{
  addUser(newUser: User){
    console.log("adding user");
    return this.http_client.post<User>(this.apiURL + 'addUser/', newUser).pipe(catchError(this.handleUserError));
  }

  addRating(siteId: number, userEmail: string, rating: number){
    console.log("adding rating: site: " + siteId );
    return this.http_client.post<{siteId: number, userEmail: string, rating: number}>
    (this.apiURL + 'addSitesRating',{siteId: siteId, userEmail: userEmail, rating: rating} );
  }

  deletePreference(email: string, id: number) {
    console.log("deleting preference: \n user email: " + email + "\ncategory id: " + id);
    //const delReference = {userEmail: userEmail, categoryId: categoryId};
    const delReference = {
      userEmail: email, categoryId: id
    };
    return this.http_client.delete<{ userEmail: string; categoryId: number; }>(this.apiURL + "deletePreference/" + email + "/" + id).pipe(catchError(this.handleUserError));
  }

  addReference(newReference: {userEmail:string, categoryId: number, categoryRating: number}) {
    console.log("adding preference: \n" + newReference);
    return this.http_client.post<{userEmail:string, categoryId: number, categoryRating: number}>
    (this.apiURL + 'addPreference', newReference).pipe(catchError(this.handleUserError));
  }

  updatePreference(upReference: {userEmail:string, categoryId: number, categoryRating: number}){
    console.log("updating reference: \n" + upReference);
    return this.http_client.put<{userEmail:string, categoryId: number, categoryRating: number}>(this.apiURL + 'updatePreference', upReference).pipe(catchError(this.handleUserError));
  }

  getUserPreferences(userEmail: string): Observable<userPreferences[]>{
    console.log("getting " + userEmail + " preferences");
    return this.http_client.get<userPreferences[]>(this.apiURL + "getUserPreferences/" + userEmail);//.pipe()
  }
  
  private handleUserError(error: HttpErrorResponse){
    return throwError(error);
    /*
    if (error.status === 0){
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('A client-side or network error occurred. please try again later.'));
    }
    else{
      if(error.status === 409){
        //user email already exist
        console.error('An error occurred:', error.error);
        return throwError(() => new Error('this email already exist'));
      }
      else
      {
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
    }
    */
  }
}
