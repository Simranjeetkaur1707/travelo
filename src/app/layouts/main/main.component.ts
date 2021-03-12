import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  constructor(private tourService:TourService) { }
  tours:any;
  isloggedin=false;

  ngOnInit(): void {
    this.GetTours();
  }

  //For Splash Screen
  @ViewChild('openSplashModal') openSplashModal:ElementRef;

  ngAfterViewInit():void {
    this.openSplashModal.nativeElement.click();
  }

  GetTours():void{
    this.tourService.GetToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(tours=>{
      console.log(tours);
      this.tours=tours;
    });
  }
}
