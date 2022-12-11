import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  templateUrl: './incidents.component.html'
})
export class IncidentsComponent
{
    constructor(private auth: AuthService,
                private router: Router) {}

    logout(): void
    {
      this.auth.logout();

      this.router.navigateByUrl('/');
    }
}
