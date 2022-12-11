import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  public errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = new User();
  }
  register(form: NgForm): void {
    if (form.valid)
    {
      // perform authentication
      this.authService.register(this.user).subscribe(
        data => {
          if (data.success)
          {
            this.authService.storeUserData(data.token, data.user);
            this.router.navigateByUrl('/auth/login');
          } else {
            this.errorMessage = 'Invalid registration. Please try again.';
          }
        },
        error => {
          if (error.error.error.errorCode === 1 ) {
            this.errorMessage = 'User already exists. Please select different username.';
          } else {
            this.errorMessage = 'Invalid registration. Please try again.';
          }
        }
      );
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }

  }

}
