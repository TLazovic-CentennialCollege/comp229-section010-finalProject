import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  public user: User;
  public errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = new User();
  }

  authenticate(form: NgForm): void {
    if (form.valid)
    {
      // perform authentication
      this.authService.authenticate(this.user).subscribe(
        data => {
          if (data.success)
          {
            this.authService.storeUserData(data.token, data.user);
            this.router.navigateByUrl('/incidents');
          } else {
            this.errorMessage = 'Invalid login. Please try again.';
          }
        },
        error => {
            this.errorMessage = 'Invalid login. Please try again.';
        }
      );
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }
  }

}
