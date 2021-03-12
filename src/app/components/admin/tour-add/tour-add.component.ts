import { Component, OnInit, ɵConsole } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { TourService } from 'src/app/services/tour.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-tour-add',
  templateUrl: './tour-add.component.html',
  styleUrls: ['./tour-add.component.scss']
})
export class TourAddComponent implements OnInit {

  tour=new Tour();
  autoId:number=1;

  constructor(private tourService: TourService) { }

  ngOnInit(): void {
    this.GetAutoPackageId();
  }

  GetAutoPackageId():void{
    this.tourService.GetToursList().snapshotChanges().pipe(
      map(changes => changes.map(c=>({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(tours => {
      if(tours.length!=0)
        this.autoId=Number(tours[tours.length-1].tourid)+1;
    });
  }


  AddTour(){
    this.tour.tourid=this.autoId;
    this.tourService.AddTour(this.tour);
    this.tour=new Tour();
  }  
}
