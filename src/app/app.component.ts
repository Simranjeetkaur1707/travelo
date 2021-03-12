import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InclusionService } from './services/inclusion.service';
import { Inclusion } from './models/inclusion';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    isAdmin:boolean=false;

    constructor( public location: Location, private router: Router, private inclusionService : InclusionService, private categoryService:CategoryService) {}

    AddInclusion(){
        var inclusion:Inclusion = new Inclusion();
        inclusion.inclusionid=6;
        inclusion.name="Meals";
        this.inclusionService.Addinclusion(inclusion);
    }

    AddCategory(){
        var category:Category = new Category();
        category.categoryid=16;
        category.name="Pilgrimage";
        this.categoryService.AddCategory(category);
    }

    ngOnInit() {
       //this.AddInclusion();
       //this.AddCategory();

       if(this.location.path().match("admin")){
           this.isAdmin=true;
       }
    }
}
