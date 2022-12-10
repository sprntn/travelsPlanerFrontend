import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root'
})
export class GetTravelDetailsService {

  //public travelDetailsSubject$: Subject<JSON> = new Subject();
  public travelDetailsSubject$: Subject<Travel> = new Subject();

  constructor() { }
}
