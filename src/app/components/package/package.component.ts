import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';
import { TourService } from 'src/app/services/tour.service';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { finalize } from 'rxjs/operators';
import { InclusionService } from 'src/app/services/inclusion.service';
import { BreakupService } from 'src/app/services/breakup.service';
import { ItineraryService } from 'src/app/services/itinerary.service';


@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  key:string;
  packageId:number;
  package=new Package();

  tour:any;
  breakups:any=[];
  itineraries:any=[];

  uploadedFiles: any[] = [];
  downloadedFiles: any[] = [];

  constructor(private packageService: PackageService,private tourService:TourService,
    private categoryService:CategoryService,  private route : ActivatedRoute, private uploadService: UploadService, 
    private inclusionService:InclusionService,
    private breakupService:BreakupService,
    private itineraryService:ItineraryService){
    }
 
    
    GetPackage(){
      this.packageService.GetPackage(Number(this.packageId))
          .once('value')
          .then(
            data=> { data.forEach(pkg=>{ this.key=pkg.key; this.package=pkg.val(); console.log(this.package); this.DownloadImages();  })},
            error=> { console.log(error); }
          );
    }
  
  
    GetBreakups(){
      this.breakupService.GetPackageBreakup(Number(this.packageId))
          .once('value')
          .then(
            data=> { data.forEach(breakup=>{ this.breakups.push(breakup.val());  })},
            error=> { console.log(error); }
      );
    }


    GetItineraries(){
      this.itineraryService.GetPackageItinararies(Number(this.packageId))
          .once('value')
          .then(
            data=> { data.forEach(itinerary=>{ this.itineraries.push(itinerary.val());  })},
            error=> { console.log(error); }
      );
    }


    DownloadImages(){
      if(this.package.images!=null){
        for(let i=0;i<this.package.images.length;i++){
          var downloadUrl = this.uploadService.Download(this.package.images[i]).toPromise().then(
            (url)=>{this.downloadedFiles.push(url);}
          );;        
        }

        console.log(this.downloadedFiles);
      }
    }

    ngOnInit(): void {

      this.route.params.subscribe(params => {
        this.packageId=params['id'];
        this.GetPackage();
        this.GetBreakups();
        this.GetItineraries();
      });  
    }
}
