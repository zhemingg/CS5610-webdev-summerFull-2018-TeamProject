import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {routing} from './app.rounting';
import {CampingSiteGridComponent} from './camping-site-grid/camping-site-grid.component';

import { CampingSiteDetailComponent } from './camping-site-detail/camping-site-detail.component';

// third part imports
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap';


import { SearchBarCampingSiteComponent } from './search-bar-campground/search-bar-camping-site.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CampingSiteServiceClient} from './services/campingSite.service.client';
import {CampingSiteToDetailServiceClient} from './communication-services/camping-site-to-detail.service.client';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {UserServiceClient} from './services/user.service.client';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CampingSiteGridComponent,
    SearchBarCampingSiteComponent,
    CampingSiteDetailComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    CarouselModule.forRoot(),  // ngx-bootstrap
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    CampingSiteServiceClient,
    CampingSiteToDetailServiceClient,
    UserServiceClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
