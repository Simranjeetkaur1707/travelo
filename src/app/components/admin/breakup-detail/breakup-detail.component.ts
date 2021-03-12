import { Component, OnInit } from '@angular/core';
import { Breakup } from 'src/app/models/breakup';
import { Package } from 'src/app/models/Package';
import { BreakupService } from 'src/app/services/breakup.service';
import { PackageService } from 'src/app/services/package.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-breakup-detail',
  templateUrl: './breakup-detail.component.html',
  styleUrls: ['./breakup-detail.component.scss']
})
export class BreakupDetailComponent implements OnInit {
  packageId:number;
  autoId:number=1;
  breakup:any = new Breakup();
  package:any = new Package();
  breakups:any[]=[];

  constructor(private breakupService:BreakupService,private packageService:PackageService,
    private route:ActivatedRoute) { }

  AddBreakup(){
    this.breakup.breakupid=this.autoId;
      console.log(this.breakup);      
      this.breakupService.AddBreakup(this.breakup);
      this.breakup=new Breakup();
      this.GetPackageBreakups();
    }

    
    GetAutoItineraryId():void{
      this.breakupService.GetBreakupList().snapshotChanges().pipe(
        map(changes => changes.map(c=>({key: c.payload.key, ...c.payload.val()})))
      ).subscribe(breakups => {
        if(breakups.length!=0)
          this.autoId=Number(breakups[breakups.length-1].breakupid)+1;
      });
    }

    GetPackage(){
      this.packageService.GetPackage(Number(this.packageId))
          .once('value')
          .then(
            data=> { data.forEach(pkg=>{ this.package=pkg.val(); this.breakup.packageid=pkg.val().packageid;  })},
            error=> { console.log(error); }
          );
    }


    GetPackageBreakups():void{
      this.breakups.splice(0);
      this.breakupService.GetPackageBreakup(Number(this.packageId)).once('value')
      .then(
        data=> { data.forEach(breakup=>{ this.breakups.push(breakup.val()); console.log(breakup.val()); })},
        error=> { console.log(error); }
      );  
    }
    

  ngOnInit(): void {
    this.GetAutoItineraryId();

    this.route.params.subscribe(params => {
      this.packageId=params['id'];
      this.GetPackage();
    });  

    this.GetPackageBreakups();
  } 
}
