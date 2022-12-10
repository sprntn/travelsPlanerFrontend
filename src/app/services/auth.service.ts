import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiURL = baseUrl + "Auth/";

  constructor(private http_client: HttpClient) { }

  loginUser(userEmail : string, UserPassword: string): Observable<any>{
    console.log("logging in, credential: \nemail: " + userEmail + "\npassword: " + UserPassword);
    const user = {
      "email" : userEmail,
      "password" : UserPassword
    }
    return this.http_client.post<any>(this.apiURL + "userLogin", user).pipe(catchError(this.handleAuthError));
  }

  demoLoginUser(userEmail : string, UserPassword: string): Observable<string>{
    console.log("logging in, credential: \nemail: " + userEmail + "\npassword: " + UserPassword);

    const user = {
      "email" : userEmail,
      "password" : UserPassword
    }
    //return this.http_client.post<User>(this.apiURL + "Users/userlogin", user );
    return this.http_client.post<string>(this.apiURL + "demoLogin", user).pipe(
      catchError(this.handleAuthError)
    );
  }

  demoGetToken(){
    return this.http_client.get<string>(this.apiURL + "testGetackEmail");
  }

  private handleAuthError(error: HttpErrorResponse){
    /*
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
    */
    if (error.status === 0){
      console.error('An error occurred:', error.error);
      return throwError(() => new Error('A client-side or network error occurred. please try again later.'));
    }
    else{
      if(error.status === 401){
        console.error('An error occurred:', error.error);
        return throwError(() => new Error('one of the email or the password wrong'));
      }
      else{
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }
    }
  }
}
