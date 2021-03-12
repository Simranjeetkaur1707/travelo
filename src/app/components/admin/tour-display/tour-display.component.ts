import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-tour-display',
  templateUrl: './tour-display.component.html',
  styleUrls: ['./tour-display.component.scss']
})
export class TourDisplayComponent implements OnInit {

  tours:any;

  constructor(private tourService:TourService) { }
  
  GetTours():void{
    this.tourService.GetToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(tours=>{
      this.tours=tours;
    });
  }

    
  ngOnInit(): void {
    this.GetTours();
  }

}
