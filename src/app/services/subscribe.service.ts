import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private dbPath = '/subscription';
  subscriptionRef: AngularFireList<String>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.subscriptionRef = fireDatabase.list(this.dbPath);
  }

  Subscribe(email:String):void{
    this.subscriptionRef.push(email);
  } 

  GetSubscription(email:any){
    return this.subscriptionRef.query.orderByValue().equalTo(email).limitToFirst(1);
  }


}
