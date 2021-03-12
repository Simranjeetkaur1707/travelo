import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { HotelService } from 'src/app/services/hotel.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.scss']
})
export class HotelAddComponent implements OnInit {

  autoId:number=1;
  hotel=new Hotel();


  constructor(private hotelService:HotelService) { }

  ngOnInit(): void {
    this.GetAutoHotelId();
  }

  GetAutoHotelId():void{
    this.hotelService.GetHotelsList().snapshotChanges().pipe(
      map(changes => changes.map(c=>({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(hotels => {
      if(hotels!=null)
        this.autoId=Number(hotels[hotels.length-1].hotelid)+1;
    });
  }  

  AddHotel(){
    this.hotel.hotelid=this.autoId;
    console.log(this.hotel);      
    this.hotelService.AddHotel(this.hotel);
    this.hotel=new Hotel();
  };
}
