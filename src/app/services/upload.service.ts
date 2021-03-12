import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private fireStorage : AngularFireStorage){}

  Upload(path:string,file:File){
    return this.fireStorage.upload(path, file);
  } 

  Download(path:string){
    return this.fireStorage.ref(path).getDownloadURL();
  }
}
