import { Component } from '@angular/core';
import { NavService,IMessage } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-listaddress',
    templateUrl: './listaddress.component.html',
    styleUrls: ['./listaddress.component.css']
})
export class ListAddressComponent {
    constructor(public nav: NavService,private route: Router){
           
    }
    UserCurr:any=[];
    ngOnInit(){
        this.nav.getUser().subscribe((data)=>{
        	this.UserCurr=data;
        });
        setTimeout(()=>{
        	console.log(this.UserCurr);
        },3000);
    }

     
}