import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = '/user';
  userRef: AngularFireList<User>=null;

  constructor(private fireDatabase : AngularFireDatabase ) { 
    this.userRef = fireDatabase.list(this.dbPath);
  }

  //Crud Function
  Register(user:User):void{
    this.userRef.push(user);
  } 

  GetUsersList():AngularFireList<User>{
    return this.userRef;
  }

  UpdateUser(key:string,user:any): Promise<void>{
    return this.userRef.update(key,user);
  }

  GetUser(userid:any){
    return this.userRef.query.orderByChild('userid').equalTo(userid).limitToFirst(1);
  }

  DeleteUser(key:string):Promise<void>{
    return this.userRef.remove(key);
  }

  DeleteAll(): Promise<void>{
    return this.userRef.remove();
  }
}
