import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {IncidentsComponent} from './incidents.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {IncidentAddEditComponent} from './addedit/incident-addedit.component';
import {AuthGuard} from '../auth/auth.guard';

const routing = RouterModule.forChild([
  // { path: 'auth', component: AuthComponent },
  // // { path: 'main', component: AuthComponent, canActivate: [AuthGuard]
  // //  children: [
  // //     { path: 'books/:mode/:id', component: BookEditorComponent, data: {title: 'Edit Book'}, canActivate: [AuthGuard]},
  // //     { path: 'books/:mode', component: BookEditorComponent, data: {title: 'Add Book'}, canActivate: [AuthGuard]},
  // //     { path: 'books', component: BookTableComponent, data: {title: 'Book Table'}, canActivate: [AuthGuard]},
  // //     { path: 'orders', component: OrderTableComponent, data: {title: 'Order Table'}, canActivate: [AuthGuard]},
  // //     { path: '**', redirectTo: 'book-list' }]
  // // },
  // { path: '**', redirectTo: 'auth' },
  {
    path: '',
    component: IncidentsComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':mode',  // add
        component: IncidentAddEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':mode/:id',  // edit
        component: IncidentAddEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ]
  }
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [IncidentsComponent, DashboardComponent, IncidentAddEditComponent]
})
export class IncidentsModule {}
