import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackageAddComponent } from './components/admin/package-add/package-add.component';
import { PackageDisplayComponent } from './components/admin/package-display/package-display.component';
import { TourAddComponent } from './components/admin/tour-add/tour-add.component';
import { TourDisplayComponent } from './components/admin/tour-display/tour-display.component';
import { PackageDetailComponent } from './components/admin/package-detail/package-detail.component';
import { TourDetailComponent } from './components/admin/tour-detail/tour-detail.component';
import { HomeComponent } from './components/home/home.component';
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
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';



const routes: Routes = [
  //Admin 
  {path:'admin/package/add', component:PackageAddComponent},
  {path:'admin/package/:id', component:PackageDetailComponent},
  {path:'admin/packages', component:PackageDisplayComponent},
  {path:'admin/tour/add', component:TourAddComponent},
  {path:'admin/tour/:id', component:TourDetailComponent},
  {path:'admin/tours', component:TourDisplayComponent},
  {path:'admin/hotel/add', component:HotelAddComponent},
  {path:'admin/hotels', component:HotelDisplayComponent},
  {path:'admin/hotel/:id', component:HotelDetailComponent},
  {path:'admin/itinerary/:id', component:ItineraryDetailComponent},
  {path:'admin/breakup/:id', component:BreakupDetailComponent},
  
  //Default
  {path:'home', component:HomeComponent},
  {path:'packages/:id', component:PackagesComponent},
  {path:'package/:id', component:PackageComponent},
  {path:'destinations/:destination', component:DestinationsComponent},
  {path:'search', component:SearchComponent},
  {path:'contact', component:ContactComponent},
  {path:'about', component:AboutComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},

  //User
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'profile', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
