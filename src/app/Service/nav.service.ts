import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class NavService {
	visible :boolean;
  constructor(public http:Http) {this.visible=false; }
  hide() { this.visible = false; }

  show() { this.visible = true; }
  getUser(){
  	return this.http.get('https://api-kcoin.herokuapp.com/api/admin').map(res=>res.json());
  }
  addUser(user){
  	return this.http.post('https://api-kcoin.herokuapp.com/api/admin',user).map(res=>res.json());
  }
}
