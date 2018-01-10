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
  UrlStatus='http://localhost:81/sendemailstatus.php'
  users=[];
  address="";
  id="";
  email="";
  addressreceived="";
  money=0;
  available=0;
  flagSignInAdmin=false;
  constructor(public http:Http) {this.visible=false; }
  hide() { this.visible = false; }
  setidwallet(address,id,email){this.address=address;this.id=id;this.email=email}
  settransaction(address,money){this.addressreceived=address;this.money=money}
  setavailabe(money){this.available=money}
  show() { this.visible = true; }
  setSignIn(){this.flagSignIn=true;}
  setSignOut(){this.flagSignIn=false;}
  setSignInAdmin(){this.flagSignInAdmin=true}
  setSignOutAdmin(){this.flagSignInAdmin=false}
  getUser(){
  	return this.http.get('http://localhost:3000/api/admin').map(res=>res.json());
  }
  addUser(user){
    return this.http.post('http://localhost:3000/api/admin',{idwallet:user.idwallet,email:user.email,password:user.password,firstname:user.firstname,lastname:user.lastname}).map((data:any)=>{console.log(data)});
  }
  activeUser(id){
    return this.http.put('http://localhost:3000/api/admin/active/'+id,{id:id}).map((data:any)=>{console.log(data)});
  }
  changePassword(password,id){
    return this.http.put('http://localhost:3000/api/admin/'+id,{newpassword:password}).map((data:any)=>{console.log(data)});
  }
  getBalance(address){
    return this.http.get('http://localhost:3000/api/admin/money/'+address.toString()).map(res=>res.json());
  }
  transactionsHis(addressmain,address,status,money){
    return this.http.post('http://localhost:3000/api/admin/transactionsHis',{"addressmain":addressmain,"address":address,"status":status,"money":money}).map((data:any)=>{console.log(data)});
  }
  transactionsRev(idwallet,deposits){
  return this.http.post('http://localhost:3000/api/admin/transactionsRev',{"idwallet":idwallet, "deposits":deposits }).map((data:any)=>{console.log(data)});
  }
  getArrayTransactionRev(){
    return this.http.get('http://localhost:3000/api/admin/transactionsRev').map(res=>res.json());
  }
  withdrawal(addressreceived, money,address){
    return this.http.post('http://localhost:3000/api/admin/withdrawal',{addressreceived:addressreceived,money:money,address:address}).map((data:any)=>{console.log(data)});
  }
  getTransaction(id){
    return this.http.get('http://localhost:3000/api/admin/gettransaction/'+id).map(res=>res.json());
  }
  getArrayTransaction(){
    return this.http.get('http://localhost:3000/api/admin/gettransaction').map(res=>res.json());
  }
  updateActualBalance(id,actual){
    return this.http.put('http://localhost:3000/api/admin/updateactual/'+id,{actual:actual}).map((data:any)=>{console.log(data)});
  }
  updateAvailableBalance(id,available){
    return this.http.put('http://localhost:3000/api/admin/updateavailable/'+id,{newavailable:available}).map((data:any)=>{console.log(data)});
  }
  updateStatus(id,status){
    return this.http.put('http://localhost:3000/api/admin/updatestatus/'+id,{status:status}).map((data:any)=>{console.log(data)});
  }
  deleteTransacton(id){
    return this.http.delete('http://localhost:3000/api/admin/'+id).map((data:any)=>{console.log(data)});
  }
  checkAddressAvailable(address){
    return this.http.get('http://localhost:3000/api/admin/getunconfirm/'+address).map(res=>res.json());
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
  sendEmailStatus(trans:IMessage):Observable<IMessage> | any{
    return this.http.post(this.UrlStatus,trans)
    .map(res=>{
      console.log('Success',trans);
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
