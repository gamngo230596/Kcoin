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
  Url='http://localhost:81/email.php';
  UrlValidate='http://localhost:81/sendmailvalidate.php';
  users=[];
  constructor(public http:Http) {this.visible=false; }
  hide() { this.visible = false; }

  show() { this.visible = true; }
  setSignIn(){this.flagSignIn=true;}
  setSignOut(){this.flagSignIn=false;}
  getUser(){
  	return this.http.get('http://localhost:3000/api/admin').map(res=>res.json());
  }
  addUser(user){
    return this.http.post('http://localhost:3000/api/admin',{idwallet:user.idwallet,email:user.email,password:user.password,firstname:user.firstname,lastname:user.lastname}).map((data:any)=>{console.log(data)});
  }
  activeUser(id){
    return this.http.put('http://localhost:3000/api/admin/active/'+id,{id:id}).map((data:any)=>{console.log(data)});
  }
  saveNewBlock(id){
    return this.http.post('http://localhost:3000/api/admin/newblocks',{id:id}).map((data:any)=>{console.log(data)});
  }
  changePassword(password,id){
    return this.http.put('http://localhost:3000/api/admin/'+id,{newpassword:password}).map((data:any)=>{console.log(data)});
  }
  sendEmail(user:IMessage):Observable<IMessage> | any{
    return this.http.post(this.Url,user)
    .map(res=>{
      console.log('Success',user);
      return res;
    })
    .catch (err=>{
      console.log('err');
      return Observable.throw(err);
    })
  }
  sendEmailValidate(validate:IMessage):Observable<IMessage> | any{
    return this.http.post(this.UrlValidate,validate)
    .map(res=>{
      console.log('Success',validate);
      return res;
    })
    .catch (err=>{
      console.log('err');
      return Observable.throw(err);
    })
  }
  
}
