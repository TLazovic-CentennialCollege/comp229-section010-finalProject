import { NgModule } from '@angular/core';
// import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import {IncidentRepository} from './incident.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [IncidentRepository,
  // {provide: StaticDataSource, useClass: RestDataSource},
  RestDataSource, AuthService]
})
export class ModelModule {}
