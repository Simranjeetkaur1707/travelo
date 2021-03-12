import { Injectable } from '@angular/core';
import { Package } from '../models/Package';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private dbPath = '/package';
  packageRef: AngularFireList<Package>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.packageRef = fireDatabase.list(this.dbPath);
  }

  //Crud Function
  AddPackage(packageData:Package):void{
    this.packageRef.push(packageData);
  } 

  GetPackagesList():AngularFireList<Package>{
    return this.packageRef;
  }

  UpdatePackage(key:string,packageData:any): Promise<void>{
    return this.packageRef.update(key,packageData);
  }

  GetPackage(packageid:any){
    return this.packageRef.query.orderByChild('packageid').equalTo(packageid).limitToFirst(1);
  }

  GetTourPackages(tourid:any){
    return this.packageRef.query.orderByChild('tourid').equalTo(tourid);
  }


  DeletePackage(key:string):Promise<void>{
    return this.packageRef.remove(key);
  }

  DeleteAll(): Promise<void>{
    return this.packageRef.remove();
  }
}
