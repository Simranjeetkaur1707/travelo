import { Injectable } from '@angular/core';
import { Inclusion } from '../models/inclusion';
import { AngularFireDatabase,AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class InclusionService {
  private dbPath = '/inclusion';
  inclusionRef: AngularFireList<Inclusion>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.inclusionRef = fireDatabase.list(this.dbPath);
  }

  //Crud Function
  Addinclusion(inclusion:Inclusion):void{
    this.inclusionRef.push(inclusion);
  } 

  GetInclusionsList():AngularFireList<Inclusion>{
    return this.inclusionRef;
  }
}
