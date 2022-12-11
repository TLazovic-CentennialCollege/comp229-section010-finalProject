import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '../model/user.model';
import {Incident} from '../model/incident.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable({providedIn: 'root'})
export class RestDataSource
{
  user: User;
  baseUrl: string;
  authToken: string;

  private httpOptions =
  {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService)
  {
    // this.user = new User();
    // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    // this.baseUrl = `${location.protocol}//${location.hostname}/api/`;
    //this.baseUrl = `https://comp229section010finalproject.herokuapp.com/api/`;

    if (location.hostname.includes("herokuapp.com")) {
      this.baseUrl = `${location.protocol}//${location.hostname}/api/`;
    } else {
      this.baseUrl = `${location.protocol}//${location.hostname}:${PORT}/api/`;
    }
  }

  // getBooks(): Observable<Book[]>
  // {
  //   return this.http.get<Book[]>(this.baseUrl + 'book-list');
  // }
  //
  // saveOrder(order: Order): Observable<Order>
  // {
  //   console.log(JSON.stringify(order));
  //   return this.http.post<Order>(this.baseUrl + 'orders/add', order);
  // }

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'auth/login', user, this.httpOptions);
  }

  register(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'auth/register', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    if (token) {
      localStorage.setItem('id_token', 'Bearer ' + token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
    }
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.post<any>(this.baseUrl + 'auth/logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  updateUser(user: User): Observable<any>
  {
    this.loadToken();
    return this.http.put<any>(this.baseUrl + 'auth/update', user, this.httpOptions);
  }

  getIncidents(): Observable<Incident[]>
  {
    this.loadToken();
    return this.http.get<Incident[]>(this.baseUrl + 'incidents', this.httpOptions);
  }

  createIncident(incident: Incident): Observable<Incident>
  {
    this.loadToken();
    return this.http.post<Incident>(this.baseUrl + 'incidents/create', incident, this.httpOptions);
  }

  updateIncident(incident: Incident): Observable<Incident>
  {
    this.loadToken();
    return this.http.put<Incident>(this.baseUrl + 'incidents/update', incident, this.httpOptions);
  }

  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}

