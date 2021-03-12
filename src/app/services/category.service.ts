import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private dbPath = '/category';
  categoryRef: AngularFireList<Category>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.categoryRef = fireDatabase.list(this.dbPath);
  }

  //Crud Function
  AddCategory(category:Category):void{
    this.categoryRef.push(category);
  } 

  GetCategoriesList():AngularFireList<Category>{
    return this.categoryRef;
  }
}
