import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: User;
  public errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  submit(form: NgForm): void {
    if (form.valid)
    {
      // perform authentication
      this.authService.update(this.user).subscribe(
        data => {
          if (data.success)
          {
            this.authService.storeUserData(null, data.user); // no token returned
            this.router.navigateByUrl('/incidents');
          } else {
            this.errorMessage = 'Invalid registration. Please try again.';
          }
        },
        error => {
          this.errorMessage = 'Invalid registration. Please try again.';
        }
      );
    }
    else
    {
      this.errorMessage = 'Form Data Invalid';
    }

  }

}
