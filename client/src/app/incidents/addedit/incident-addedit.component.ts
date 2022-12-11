import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {User} from '../../model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {Incident} from '../../model/incident.model';
import {IncidentsService} from '../incidents.service';

export enum FormMode {
  EDIT = 'edit',
  ADD = 'add'
}

@Component({
  selector: 'app-incident-addedit',
  templateUrl: './incident-addedit.component.html',
  styleUrls: ['./incident-addedit.component.css']
})
export class IncidentAddEditComponent implements OnInit {
  FormMode = FormMode;

  public mode: string;  // add or edit
  public id: string;
  public state: any;
  public user: User;
  public errorMessage: string;
  public incident: Incident;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private incidentsService: IncidentsService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.state = this.location.getState();

    if (this.mode === FormMode.ADD) {
      this.incident = new Incident();

      const now = new Date();
      this.incident.uid = `${now.getDay()}${now.getMonth()}${now.getFullYear()}-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
      this.incident.status = 'new';
      this.incident.priority = 'prio1';

      this.incident.customerInfo = {
        displayName: this.user.displayName,
        email: this.user.email
      };
    } else {
      this.incident = this.state.incident;
    }
  }

  submit(form: NgForm): void {
    if (form.valid)
    {
      // perform authentication
      if (this.mode === FormMode.ADD) {
        this.incidentsService.create(this.incident).subscribe(
          data => {
            if (data.success) {
              this.router.navigateByUrl('/incidents');
            } else {
              this.errorMessage = 'Invalid authentication. Please try again.';
            }
          },
          error => {
            this.errorMessage = 'Invalid authentication. Please try again.';
          }
        );
      } else {
        this.incidentsService.update(this.incident).subscribe(
          data => {
            if (data.success) {
              this.router.navigateByUrl('/incidents');
            } else {
              this.errorMessage = 'Invalid authentication. Please try again.';
            }
          },
          error => {
            this.errorMessage = 'Invalid authentication. Please try again.';
          }
        );
      }
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }

  }

}

