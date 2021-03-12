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



@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {

  key:string;
  packageId:number;
  package=new Package();

  tours:any;
  categories:any;
  inclusions:any;

  uploadedFiles: any[] = [];
  downloadedFiles: any[] = [];

  constructor(private packageService: PackageService,private tourService:TourService,
    private categoryService:CategoryService,  private route : ActivatedRoute, private uploadService: UploadService, 
    private inclusionService:InclusionService){
    }
 
    GetTours():void{
      this.tourService.GetToursList().snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(tours=>{
        this.tours=tours;
      });
    }

    GetCategories():void{
      this.categoryService.GetCategoriesList().snapshotChanges().pipe(
        map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(categories=>{
        this.categories=categories;
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


    GetPackage(){
      this.packageService.GetPackage(Number(this.packageId))
          .once('value')
          .then(
            data=> { data.forEach(pkg=>{ this.key=pkg.key; this.package=pkg.val(); console.log(this.package); this.DownloadImages();  })},
            error=> { console.log(error); }
          );
    }
  
    UpdatePackage()
    {
      console.log(this.package);      
      this.packageService.UpdatePackage(this.key, this.package);
    }

    OnFileSelected(event) {
      for (let i = 0; i < event.target.files.length; i++) {
        var file:File=event.target.files[i];
        this.FileUpload(file);
      }
      this.package.images=this.uploadedFiles;
      this.UpdatePackage();
    }


    FileUpload(file) {
      const path = `package/${file.name}`;
      this.uploadService.Upload(path,file).snapshotChanges().pipe(
        finalize(() =>  {
          this.uploadedFiles.push(path);
        })
      ).subscribe();
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
      this.GetTours();
      this.GetCategories();
      this.GetInclusions();

      this.route.params.subscribe(params => {
        this.packageId=params['id'];
        this.GetPackage();
      });  
    }
}
