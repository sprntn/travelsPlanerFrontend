import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTravelIdService {

  public travelIdSubject$: Subject<number> = new Subject();

  constructor() { }
}
