import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectedSite } from '../models/selectedSite';

@Injectable({
  providedIn: 'root'
})
export class GetVisitService {

  public selectedSitesSubject$: Subject<SelectedSite> = new Subject();

  constructor() { }
}
