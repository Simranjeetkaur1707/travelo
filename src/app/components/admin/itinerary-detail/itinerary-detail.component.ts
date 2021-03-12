import { Component, OnInit } from '@angular/core';
import { Itinerary } from 'src/app/models/itinerary';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { PackageService } from 'src/app/services/package.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Package } from 'src/app/models/Package';


@Component({
  selector: 'admin-itinerary-detail',
  templateUrl: './itinerary-detail.component.html',
  styleUrls: ['./itinerary-detail.component.scss']
})
export class ItineraryDetailComponent implements OnInit {
  packageId:number;
  autoId:number=1;
  itinerary:any = new Itinerary();
  package:any = new Package();
  itineraries:any[]=[];

  constructor(private itineraryService: ItineraryService,private packageService:PackageService,
    private route:ActivatedRoute) { }

  AddItinerary(){
    this.itinerary.id=this.autoId;
      console.log(this.itinerary);      
      this.itineraryService.AddItinerary(this.itinerary);
      this.itinerary=new Itinerary();
      this.GetPackageItineraries();
    }

    
    GetAutoItineraryId():void{
      this.itineraryService.GetItinerariesList().snapshotChanges().pipe(
        map(changes => changes.map(c=>({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(itineraries => {
        if(itineraries.length!=0)
          this.autoId=Number(itineraries[itineraries.length-1].id)+1;
      });
    }

    GetPackage(){
      this.packageService.GetPackage(Number(this.packageId))
          .once('value')
          .then(
            data=> { data.forEach(pkg=>{ this.package=pkg.val(); this.itinerary.packageid=pkg.val().packageid;  })},
            error=> { console.log(error); }
          ).finally(()=>console.log(this.itineraries));
    }


    GetPackageItineraries():void{
      this.itineraries.splice(0);
      this.itineraryService.GetPackageItinararies(Number(this.packageId)).once('value')
      .then(
        data=> { data.forEach(itinerary=>{ this.itineraries.push(itinerary.val()); console.log(itinerary.val()); })},
        error=> { console.log(error); }
      );  
    }
    

  ngOnInit(): void {
    this.GetAutoItineraryId();

    this.route.params.subscribe(params => {
      this.packageId=params['id'];
      this.GetPackage();
    });  

    this.GetPackageItineraries();
  } 
}
