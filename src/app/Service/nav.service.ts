import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Resolve } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
export interface IMessage {
  email?: string,
  id?: any
}
@Injectable()
export class NavService {
	visible :boolean;
  flagSignIn:boolean;

  constructor(public http:Http) {this.visible=false; }
  hide() { this.visible = false; }

  show() { this.visible = true; }
  setSignIn(){this.flagSignIn=true;}
  setSignOut(){this.flagSignIn=false;}
  getUser(){
  	return this.http.get('https://api-kcoin.herokuapp.com/api/admin').map(res=>res.json());
  }
  addUser(user){
  	return this.http.post('https://api-kcoin.herokuapp.com/api/admin',user).map(res=>res.json());
  }
  activeUser(id){
    return this.http.put('https://api-kcoin.herokuapp.com/api/admin/active',id).map(res=>res.json());
  }

  getAddress(){
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Access-Control-Allow-Origin', '*'); 
    myHeaders.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');  
    return this.http.get('https://api.kcoin.club/generate-address',myHeaders).map(res=>res.json());
  }
  sendEmail(user:IMessage):Observable<IMessage> | any{
    return this.http.post('http://localhost:81/email.php',user)
    .map(res=>{
      console.log('Success',user);
      return res;
    })
    .catch (err=>{
      console.log('err');
      return Observable.throw(err);
    })
  }
}
