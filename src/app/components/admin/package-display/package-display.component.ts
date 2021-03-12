import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { PackageService } from 'src/app/services/package.service';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-package-display',
  templateUrl: './package-display.component.html',
  styleUrls: ['./package-display.component.scss']
})
export class PackageDisplayComponent implements OnInit {

  packages:any;

  constructor(private tourService:TourService, private packageService:PackageService) { }
  
  GetPackages():void{
    this.packageService.GetPackagesList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(packages=>{

      for(let i=0;i<packages.length;i++){
        this.GetTour(packages[i]);
      }
  
      this.packages=packages;
    });
  }

  GetTour(pkg){
    this.tourService.GetTour(Number(pkg.tourid))
        .once('value')
        .then(
          data=> { data.forEach(tour=>{ pkg.tour = tour.val().name })},
          error=> { console.log(error); }
        );
  }
    
  ngOnInit(): void {
    this.GetPackages();
  }

}
