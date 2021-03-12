import { Injectable } from '@angular/core';
import { Tour } from '../models/tour';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private dbPath = '/tour';
  tourRef: AngularFireList<Tour>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.tourRef = fireDatabase.list(this.dbPath);
  }

  AddTour(tour:Tour):void{
    this.tourRef.push(tour);
  } 

  GetToursList():AngularFireList<Tour>{
    return this.tourRef;
  }

  GetTour(tourid:any){
    return this.tourRef.query.orderByChild('tourid').equalTo(tourid).limitToFirst(1);
  }


  UpdateTour(key:string,tour:any): Promise<void>{
    return this.tourRef.update(key,tour);
  }

  DeleteTour(key:string):Promise<void>{
    return this.tourRef.remove(key);
  }

  DeleteAll(): Promise<void>{
    return this.tourRef.remove();
  }
}
