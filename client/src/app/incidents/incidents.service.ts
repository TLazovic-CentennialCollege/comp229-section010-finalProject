import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from '../model/rest.datasource';
import { JwtHelperService } from '@auth0/angular-jwt';

import {Incident} from '../model/incident.model';

@Injectable({providedIn: 'root'})
export class IncidentsService
{
  constructor(private datasource: RestDataSource)
  {
  }

  create(incident: Incident): Observable<any>
  {
    return this.datasource.createIncident(incident);
  }
  update(incident: Incident): Observable<any>
  {
    return this.datasource.updateIncident(incident);
  }

}
