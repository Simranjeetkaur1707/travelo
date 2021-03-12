import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-hotel-display',
  templateUrl: './hotel-display.component.html',
  styleUrls: ['./hotel-display.component.scss']
})
export class HotelDisplayComponent implements OnInit {
  hotels:any;

  constructor(private hotelService:HotelService) { }
   
  GetHotels():void{
    this.hotelService.GetHotelsList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(hotels=>{
      this.hotels=hotels;
      console.log(hotels);
    });
  }
   
  ngOnInit(): void {
    this.GetHotels();
  }
}
