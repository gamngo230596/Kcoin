import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
    constructor(public nav: NavService,private route: Router){}
    balance;
    address;
    UserCurr:any=[];
    ngOnInit(){
    	this.nav.getUser().subscribe(user=>{this.UserCurr=user});
    	setTimeout(()=>{console.log(this.UserCurr);},5000);
    	//this.nav.getBalance().subscribe(balance=>{this.balance=balance});
        //setTimeout(()=>{console.log(this.balance);},5000);
    }
    
}