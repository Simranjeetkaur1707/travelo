import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user=new User();
  autoId:number=1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.GetAutoUserId();
  }

  GetAutoUserId():void{
    this.authService.GetUsersList().snapshotChanges().pipe(
      map(changes => changes.map(c=>({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(users => {
      if(users.length!=0)
        this.autoId=Number(users[users.length-1].userid)+1;
    });
  }


  Register(){
    this.user.userid=this.autoId;
    this.authService.Register(this.user);
    this.user=new User();
  }  
}
