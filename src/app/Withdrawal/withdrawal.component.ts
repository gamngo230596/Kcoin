import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent {
    constructor(public nav: NavService,private route: Router){
    	this.status="Khởi tạo";
    }
    actual=0;
    available=0;
    Address:any;
    status="Khởi tạo";
    messageErr;
    transaction:any=[];
    ngOnInit(){
        console.log(this.nav.address);
    	this.nav.getBalance(this.nav.address).subscribe(balance=>{this.actual=balance;this.available=balance});
       	setTimeout(()=>{console.log(this.actual);},4000);
        this.nav.getTransaction(this.nav.address).subscribe(trans=>{this.transaction=trans});
        setTimeout(()=>{console.log(this.transaction);},4000);
        /*this.nav.updateActualBalance(this.nav.id,this.actual).subscribe(
                data=>console.log(data),
                error=>console.log(error));
        this.nav.updateAvailableBalance(this.nav.id,this.available).subscribe(
                data=>console.log(data),
                error=>console.log(error));*/
        
    }
    Send(address,money){
    	this.Address=address;
    	this.nav.transactionsHis(this.nav.address,address,this.status).subscribe(
            data=>console.log(data),
            error=>console.log(error),
            ()=>this.messageErr="Success!");

    }
     
}