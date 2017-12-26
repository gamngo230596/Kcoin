import { Component,OnInit } from '@angular/core';
import { NavService } from '../Service/nav.service';
import * as Crypto from 'crypto-js';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	user: any[];
	test:any;
    constructor(public nav: NavService){}	
    ngOnInit(){
	this.nav.show();
	let that=this;
	this.test=Crypto.AES.encrypt("my message","secret key");
	console.log(this.test);
	console.log(this);
	console.log("that");
	this.nav.getUser().subscribe(users=>{that.user=users});
	setTimeout(()=>{console.log(this.user);},1500);
	//console.log(this.user);
	
}
}
