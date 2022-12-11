import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from '../model/rest.datasource';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../model/user.model';

@Injectable({providedIn: 'root'})
export class AuthService
{
  user: User;

  constructor(private datasource: RestDataSource)
  {
    this.user = new User();
  }

  authenticate(user: User): Observable<any>
  {
    return this.datasource.authenticate(user);
  }

  register(user: User): Observable<any>
  {
    return this.datasource.register(user);
  }

  storeUserData(token: any, user: User): void
  {
    this.datasource.storeUserData(token, user);
  }

  get authenticated(): boolean
  {
    return this.datasource.loggedIn();
  }

  getUser(): User {
    return this.datasource.getUser();
  }

  logout(): Observable<any>
  {
    return this.datasource.logout();
  }

  update(user: User): Observable<any>
  {
    return this.datasource.updateUser(user);
  }

}
