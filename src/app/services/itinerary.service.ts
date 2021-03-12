import { Injectable } from '@angular/core';
import { Itinerary } from '../models/itinerary';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private dbPath = '/itinerary';
  itinerariesRef: AngularFireList<Itinerary>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.itinerariesRef = fireDatabase.list(this.dbPath);
  }

  AddItinerary(user:Itinerary):void{
    this.itinerariesRef.push(user);
  } 

  GetItinerariesList():AngularFireList<Itinerary>{
    return this.itinerariesRef;
  }

  GetPackageItinararies(packageid:any){
    return this.itinerariesRef.query.orderByChild('packageid').equalTo(packageid);
  }


  UpdateItinerary(key:string,user:any): Promise<void>{
    return this.itinerariesRef.update(key,user);
  }

  DeleteItinerary(key:string):Promise<void>{
    return this.itinerariesRef.remove(key);
  }

  DeleteAll(): Promise<void>{
    return this.itinerariesRef.remove();
  }
}
