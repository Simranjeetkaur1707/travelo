import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Breakup } from '../models/breakup';

@Injectable({
  providedIn: 'root'
})
export class BreakupService {
  private dbPath = '/breakup';
  breakupRef: AngularFireList<Breakup>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.breakupRef = fireDatabase.list(this.dbPath);
  }

  AddBreakup(breakup:Breakup):void{
    this.breakupRef.push(breakup);
  } 

  GetBreakupList():AngularFireList<Breakup>{
    return this.breakupRef;
  }

  GetPackageBreakup(packageid:any){
    return this.breakupRef.query.orderByChild('packageid').equalTo(packageid);
  }

  UpdateBreakup(key:string,breakup:any): Promise<void>{
    return this.breakupRef.update(key,breakup);
  }

  DeleteUser(key:string):Promise<void>{
    return this.breakupRef.remove(key);
  }

  DeleteAll(): Promise<void>{
    return this.breakupRef.remove();
  }
}
