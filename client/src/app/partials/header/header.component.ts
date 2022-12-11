import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  onLogoutClick(): void
  {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['/auth/login']);
    });
  }


  isLoggedIn(): boolean
  {
    const result = this.authService.authenticated;
    if (result)
    {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return result;
  }

}
