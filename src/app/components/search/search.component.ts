import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';
import { UploadService } from 'src/app/services/upload.service';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';
import { TourService } from 'src/app/services/tour.service';
import { Options, LabelType } from 'ng5-slider';
import { Subscription } from 'rxjs';
import { SubscribeService } from 'src/app/services/subscribe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  subscriptionEmail="";
  isSubscribed=false;
  tourid:number;
  packages:any[]=[];
  categories:any;
  filters={tour:[],theme:[],hotel:[],flight:[],price:[], duration:[], city:[]};


 
  minPrice=0;
  maxPrice=100000;
  priceOptions: Options = {
    floor: 0,
    ceil: 100000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '₹' + value;
        case LabelType.High:
          return '₹' + value;
        default:
          return '₹' + value;
      }
    }
  };

  minDuration=1;
  maxDuration=10;
  durationOptions: Options = {
    floor: 1,
    ceil: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value+"N";
        case LabelType.High:
          return value+"N";
        default:
          return value+"N";
      }
    }
  };


  //Filters
  hotelRating=4;
  flightIncluded=true;
  theme=[];

  constructor(private route:ActivatedRoute, private packageService:PackageService,
    private uploadService:UploadService, private categoryService:CategoryService, 
    private tourService:TourService,
    private subscriptionService:SubscribeService) { }


    GetPackages():void{
      this.packageService.GetPackagesList().snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(packages=>{
       
        var filteredPackages = {ids:[],packages:[]};

        for(let i=0;i<packages.length;i++){    

          if(this.filters.theme.length==0){
            if(filteredPackages.ids.indexOf(packages[i].packageid)==-1  && packages[i].cost>=this.minPrice && packages[i].cost<=this.maxPrice && Number(packages[i].duration.substring(0,packages[i].duration.indexOf("N")))>=this.minDuration && Number(packages[i].duration.substring(0,packages[i].duration.indexOf("N")))<=this.maxDuration)
            {
              filteredPackages.ids.push(packages[i].packageid);
              filteredPackages.packages.push(packages[i]);
            }          
          }
          else{
            for(let j=0;j<this.filters.theme.length;j++){
              if(packages[i].category.indexOf(this.filters.theme[j])!=-1)
              {
                if(filteredPackages.ids.indexOf(packages[i].packageid)==-1 && packages[i].cost>=this.minPrice && packages[i].cost<=this.maxPrice && Number(packages[i].duration.substring(0,packages[i].duration.indexOf("N")))>=this.minDuration && Number(packages[i].duration.substring(0,packages[i].duration.indexOf("N")))<=this.maxDuration)
                {
                  filteredPackages.ids.push(packages[i].packageid);
                  filteredPackages.packages.push(packages[i]);
                }
              }
            }            
          }
        }
  
        var finalPackages=[];
        
        for(let i=0;i<filteredPackages.packages.length;i++){
          //Download Images
          this.uploadService.Download(filteredPackages.packages[i].images[0]).toPromise().then(
            (url)=>{filteredPackages.packages[i].imageurl=url;}
          );          


          //Fetch Destination
          this.tourService.GetTour(filteredPackages.packages[i].tourid)
            .once('value')
            .then(
              data=>{
                data.forEach(tour=>{
                  if(this.filters.city.length==0 || (this.filters.city.length!=0 && this.filters.city[0]==tour.val().name)){
                    filteredPackages.packages[i].tour=tour.val().name;
                    finalPackages.push(filteredPackages.packages[i]);
                  }
                });

                var tourPackages=[];

                if(this.filters.tour.length==0){
                  this.packages=finalPackages;   
                }
                else{
                  for(let i=0;i<finalPackages.length;i++){
                    if(parseInt(finalPackages[i].tourid)==parseInt(this.filters.tour[0])){
                      tourPackages.push(finalPackages[i]);
                    }
                  }
                  this.packages=tourPackages;
                }
        

              },
              error=>{}
            );
        }  
      });
    }
  

  ChangeHotelRating(rating){
    this.hotelRating=rating;
    this.filters.hotel[0]=rating + " Stars";
  }

  ChangeFlightOption(value){
    this.flightIncluded=value;
    this.filters.flight[0]=this.flightIncluded?"Included":"Excluded";
  }

  ChangeThemeOption(){
    this.filters.theme=this.theme;
    this.GetPackages();
  }

  ChangePriceOption(){
    if(this.filters.price.length==0){
      this.filters.price.push(this.minPrice);
      this.filters.price.push(this.maxPrice);  
    }
    else{
      this.filters.price[0]=this.minPrice;
      this.filters.price[1]=this.maxPrice;
    }
    this.GetPackages();
  }

  ChangeDurationOption(){
    if(this.filters.duration.length==0){
      this.filters.duration.push(this.minDuration);
      this.filters.duration.push(this.maxDuration);
    }
    else{
      this.filters.duration[0]=this.minDuration;
      this.filters.duration[1]=this.maxDuration;
    }
    this.GetPackages();
  }

  GetCategories():void{
    this.categoryService.GetCategoriesList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(categories=>{
      this.categories=categories;
    });
  }


  
  RemoveFilter(key,value){
    if(key=="theme")
      this.filters.theme.splice(value,1);
    
    if(key=="price"){
      let index=this.filters.price.indexOf(value);
      if(index==0){
        //this.filters.price.splice()
      }
    }
    this.GetPackages();
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

    this.GetCategories();


    this.route.queryParams.subscribe(params => {
      const theme = params['theme'];
      const city = params["city"];
      const to = params['to'];
      const from = params['from'];
      const date = params['date'];
      const tour = params['tour'];

      if(theme!=undefined)
        this.filters.theme.push(theme);
      
      if(city!=undefined)
        this.filters.city.push(city);

      if(to!=undefined)
        this.filters.city.push(to);

      if(tour!=undefined)
        this.filters.tour.push(tour);

      
      this.filters.hotel.push(this.hotelRating + " stars");
      this.filters.flight.push(this.flightIncluded?"Included":"Excluded");
    });

    this.GetPackages();
  }

}
