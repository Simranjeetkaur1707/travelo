import { Component, OnInit } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { TourService } from 'src/app/services/tour.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  tourId:number;
  key:string;
  tour=new Tour();

  uploadedFile:string="";
  downloadedFiles:string[]=[];


  constructor(private tourService: TourService, private route : ActivatedRoute, private uploadService:UploadService) { }

  GetTour(){
    this.tourService.GetTour(Number(this.tourId))
        .once('value')
        .then(
          data=> { data.forEach(tour=>{ this.key=tour.key; this.tour=tour.val(); console.log(this.tour); this.DownloadImage();  })},
          error=> { console.log(error); }
    );
  }

  UpdateTour(){
    console.log(this.tour);
    this.tourService.UpdateTour(this.key,this.tour);
  }  

  OnFileSelected(event) {
    var file:File=event.target.files[0];
    this.FileUpload(file);    
  }


  FileUpload(file) {
    const path = `tour/${Date.now()}_${file.name}`;
    this.uploadService.Upload(path,file).snapshotChanges().pipe(
      finalize(() =>  {
        this.uploadedFile = path;
        this.tour.image=this.uploadedFile;
        this.UpdateTour();
      })
    ).subscribe();
  }

  DownloadImage(){
    if(this.tour.image!=null)
    {
      var downloadUrl = this.uploadService.Download(this.tour.image).toPromise().then(
        (url)=>{this.downloadedFiles.push(url);}
      );        
      console.log(this.downloadedFiles);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tourId=params['id'];
      this.GetTour();
    });  
  }
}
