import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from 'src/app/services/package.service';
import { UploadService } from 'src/app/services/upload.service';
import { CategoryService } from 'src/app/services/category.service';
import { map } from 'rxjs/operators';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  tourid:number;
  packages:any[]=[];
  categories:any;

  constructor(private route:ActivatedRoute, private packageService:PackageService,
    private uploadService:UploadService, private categoryService:CategoryService,
    private tourService:TourService) { }

  GetPackages(){
    this.packageService.GetTourPackages(this.tourid)
    .once('value')
    .then(
      data=> { data.forEach(pkg=>{ this.packages.push(pkg.val()); })},
      error=> { console.log(error); }
    ).finally(()=>{

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


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tourid=Number(params['id']);
      this.GetPackages();
      this.GetCategories();
    });  
  }
}
