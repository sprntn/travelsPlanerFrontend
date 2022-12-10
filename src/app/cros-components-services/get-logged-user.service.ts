import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GetLoggedUserService {

  public userEmailSubject$: Subject<string> = new Subject();

  constructor() { }
}
