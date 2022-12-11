import { Injectable } from '@angular/core';
// import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import {Observable} from 'rxjs';
import {Incident} from './incident.model';

@Injectable({providedIn: 'root'})
export class IncidentRepository
{
  private incidents: Incident[] = [];

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getIncidents().subscribe(data => {
      this.incidents = data;
    });
  }

  getIncidents(): Incident[]
  {
    return this.incidents;
  }
}
