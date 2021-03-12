import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {Select} from 'react-select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs'

import { AdminNavbarComponent } from './layouts/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './layouts/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './layouts/admin-footer/admin-footer.component';

//Firebase Modules Imports
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { TourAddComponent } from './components/admin/tour-add/tour-add.component';
import { TourDisplayComponent } from './components/admin/tour-display/tour-display.component';
import { PackageAddComponent } from './components/admin/package-add/package-add.component';
import { PackageDisplayComponent } from './components/admin/package-display/package-display.component';
import { PackageDetailComponent } from './components/admin/package-detail/package-detail.component';
import { TourDetailComponent } from './components/admin/tour-detail/tour-detail.component';
import { DropzoneDirective } from './directives/dropzone.directive';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { MainComponent } from './layouts/main/main.component';
import { PackagesComponent } from './components/packages/packages.component';
import { ItineraryDetailComponent } from './components/admin/itinerary-detail/itinerary-detail.component';
import { HotelAddComponent } from './components/admin/hotel-add/hotel-add.component';
import { HotelDisplayComponent } from './components/admin/hotel-display/hotel-display.component';
import { HotelDetailComponent } from './components/admin/hotel-detail/hotel-detail.component';
import { BreakupDetailComponent } from './components/admin/breakup-detail/breakup-detail.component';
import { PackageComponent } from './components/package/package.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    TourAddComponent,
    TourDisplayComponent,
    PackageAddComponent,
    PackageDisplayComponent,
    PackageDetailComponent,
    TourDetailComponent,
    DropzoneDirective,
    HomeComponent,
    AdminComponent,
    MainComponent,
    PackagesComponent,
    ItineraryDetailComponent,
    HotelAddComponent,
    HotelDisplayComponent,
    HotelDetailComponent,
    BreakupDetailComponent,
    PackageComponent,
    DestinationsComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ContactComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
