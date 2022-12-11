import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AuthComponent} from './auth.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {EditProfileComponent} from './editProfile/edit-profile.component';
// import { AuthComponent } from './auth/auth.component';
// import { AuthGuard } from './auth/auth.guard';
// import { AuthComponent } from './admin.component';
// import { OrderTableComponent } from './order-table/order-table.component';
// import { BookEditorComponent } from './book-editor/book-editor.component';
// import { BookTableComponent } from './book-table/book-table.component';

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
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      // {
      //   path: 'logout',
      //   component: LogoutComponent,
      // },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ]
  }
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, LoginComponent, RegisterComponent, EditProfileComponent]
})
export class AuthModule {}
