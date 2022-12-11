import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent
{
    constructor(private auth: AuthService,
                private router: Router) {}

    logout(): void
    {
      this.auth.logout();

      this.router.navigateByUrl('/');
    }
}
