import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { UploadService } from 'src/app/services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  key:string;
  hotelId:number;
  hotel = new Hotel();
  downloadedFiles:string[]=[];

  constructor(private hotelService : HotelService, private uploadService : UploadService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId=params['id'];
      this.GetHotel();
    });  
  }

  GetHotel(){
    this.hotelService.GetHotel(Number(this.hotelId))
        .once('value')
        .then(
          data=> { data.forEach(hotel=>{ this.key=hotel.key; this.hotel=hotel.val(); console.log(this.hotel); this.DownloadImage();  })},
          error=> { console.log(error); }
        );
  }


  UpdateHotel(){
    console.log(this.hotel);      
    this.hotelService.UpdateHotel(this.key, this.hotel);
    this.DownloadImage();
  }

  OnFileSelected(event) {
      var file:File=event.target.files[0];
      this.FileUpload(file);    
  }


  FileUpload(file) {
    const path = `hotel/${Date.now()}_${file.name}`;
    this.uploadService.Upload(path,file).snapshotChanges().pipe(
      finalize(() =>  {
        this.hotel.image=path;
        this.UpdateHotel();
        this.DownloadImage();
      })
    ).subscribe();
  }

  DownloadImage(){
    if(this.hotel.image!=null)
    {
      var downloadUrl = this.uploadService.Download(this.hotel.image).toPromise().then(
        (url)=>{this.downloadedFiles.push(url);}
      );        
      console.log(this.downloadedFiles);
    }
  }
}
