import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import {map} from 'rxjs/operators';
import { UploadService } from 'src/app/services/upload.service';
import { PackageService } from 'src/app/services/package.service';
import { CategoryService } from 'src/app/services/category.service';
import { SubscribeService } from 'src/app/services/subscribe.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  subscriptionEmail="";
  isSubscribed=false;
  tours:any;
  packages:any;
  categories:any;

  goingFrom="";
  goingTo="";
  date="";

  constructor(private tourService:TourService,private packageService : PackageService,
    private uploadService:UploadService, private categoryService:CategoryService,
    private subscriptionService:SubscribeService) { }
  
  GetTours():void{
    this.tourService.GetToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(tours=>{
      this.tours=tours;

      for(let i=0;i<this.tours.length;i++){
        //Download Images
        this.uploadService.Download(this.tours[i].image).toPromise().then(
          (url)=>{this.tours[i].imageurl=url;}
        );
        
        //Download Packages
        this.packageService.GetTourPackages(this.tours[i].tourid)
        .once('value')
        .then(
        data=> { 
          if(data.val()!=null) 
          {
            this.tours[i].numpackage=Object.keys(data.val()).length; 
            this.tours[i].minpackagecost=10000000000000;
            data.forEach(pkg=>{ 
              if(this.tours[i].minpackagecost>pkg.val().cost)
                this.tours[i].minpackagecost=pkg.val().cost;
            });
          }
          else 
          {
            this.tours[i].minpackagecost=0;
            this.tours[i].numpackage=0; 
          }
        },
        error=> { console.log(error); }
        );        
      }
    });
  }


  GetPackages():void{
    this.packageService.GetPackagesList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(packages=>{
      this.packages=packages.slice(0,6);

      for(let i=0;i<this.packages.length;i++){
        //Download Images
        this.uploadService.Download(this.packages[i].images[0]).toPromise().then(
          (url)=>{this.packages[i].imageurl=url;}
        );        

        //Fetch Destination
        this.tourService.GetTour(this.packages[i].tourid)
          .once('value')
          .then(
            data=>{
              data.forEach(tour=>{this.packages[i].tour=tour.val().name})
            },
            error=>{}
          );
      }  
    });
  }


  GetCategories():void{
    this.categoryService.GetCategoriesList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(categories=>{
      this.categories=categories;
    });
  }
 
  Subscribe(){

    this.subscriptionService.GetSubscription(this.subscriptionEmail)
    .once('value')
    .then(
      data=>{
        if(data.val()==null){
          this.subscriptionService.Subscribe(this.subscriptionEmail);
          this.isSubscribed=false;
        }
        else{
          this.isSubscribed=true;
        }
      },
      error=>{}
    );
  }
 
  
  ngOnInit(): void {
    this.GetTours();
    this.GetPackages();
    this.GetCategories();
  }

}
