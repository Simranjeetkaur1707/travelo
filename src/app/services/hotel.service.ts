import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';
import { Hotel } from '../models/hotel';


@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private dbPath = '/hotel';
  hotelsRef: AngularFireList<Hotel>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.hotelsRef = fireDatabase.list(this.dbPath);
  }

  AddHotel(hotel:Hotel):void{
    this.hotelsRef.push(hotel);
  } 

  GetHotel(hotelid:any){
    return this.hotelsRef.query.orderByChild('hotelid').equalTo(hotelid).limitToFirst(1);
  }

  GetHotelsList():AngularFireList<Hotel>{
    return this.hotelsRef;
  }

  UpdateHotel(key:string,hotel:any): Promise<void>{
    return this.hotelsRef.update(key,hotel);
  }

  DeleteHotel(key:string):Promise<void>{
    return this.hotelsRef.remove(key);
  }

  DeleteAll(): Promise<void>{
    return this.hotelsRef.remove();
  }
}
