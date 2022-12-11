import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
// import { StoreFirstGuard } from './guards/storeFirst.guard';

const routes: Routes = [
 {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'incidents', loadChildren: () => import('./incidents/incidents.module').then(m => m.IncidentsModule)},



 // {path: 'login', data: {title: 'Login'}, redirectTo: '/admin/auth', pathMatch: 'full'},
 //
 // {path: 'about', component: AboutComponent, data: {title: 'About'}},
 // {path: 'products', component: ProductsComponent, data: {title: 'Products'}},
 // {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
 // {path: 'contact', component: ContactComponent, data: {title: 'Contact'}},
 //
 // {path: 'book-list', component: BookStoreComponent, data: { title: 'Book Store'}, canActivate: [StoreFirstGuard]},
 // {path: 'cart', component: CartDetailComponent, data: { title: 'Shopping Cart'}, canActivate: [StoreFirstGuard]},
 // {path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout'}, canActivate: [StoreFirstGuard]},

 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [ StoreFirstGuard]
})
export class AppRoutingModule { }
