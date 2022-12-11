import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BasePageComponent } from './base-page/base-page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {AuthService} from '../auth/auth.service';


@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule],
  declarations: [
    BasePageComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    BasePageComponent,
    FooterComponent,
    HeaderComponent
    ],
  providers: [AuthService]
})
export class PartialsModule {}
