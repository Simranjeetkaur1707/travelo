import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/models/Package';
import { PackageService } from 'src/app/services/package.service';
import { TourService } from 'src/app/services/tour.service';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { InclusionService } from 'src/app/services/inclusion.service';


@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.scss']
})
export class PackageAddComponent implements OnInit {
  autoId:number=1;
  package=new Package();

  tours:any;
  categories:any;
  inclusions:any;

  constructor(private packageService: PackageService,private tourService:TourService,
    private categoryService:CategoryService, private inclusionService:InclusionService){}

    AddPackage(){
      this.package.packageid=this.autoId;
      console.log(this.package);      
      this.packageService.AddPackage(this.package);
      this.package=new Package();
    }
    
    GetAutoPackageId():void{
      this.packageService.GetPackagesList().snapshotChanges().pipe(
        map(changes => changes.map(c=>({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(packages => {
        if(packages.length!=0)
          this.autoId=Number(packages[packages.length-1].packageid)+1;
      });
    }
 
    GetTours():void{
      this.tourService.GetToursList().snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(tours=>{
        console.log(tours);
        this.tours=tours;
      });
    }

    GetInclusions():void{
      this.inclusionService.GetInclusionsList().snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(inclusions=>{
        console.log(inclusions);
        this.inclusions=inclusions;
      });      
    }

    GetCategories():void{
      this.categoryService.GetCategoriesList().snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(categories=>{
        console.log(categories);
        this.categories=categories;
      });
    }


    ngOnInit(): void {
      this.GetAutoPackageId();
      this.GetTours();
      this.GetCategories();
      this.GetInclusions();
    }
}
