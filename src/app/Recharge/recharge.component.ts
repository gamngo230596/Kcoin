import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-recharge',
    templateUrl: './recharge.component.html',
    styleUrls: ['./recharge.component.css']
})
export class RechargeComponent {
    constructor(public nav: NavService,private route: Router){
        setInterval(()=>{
            this.nav.getUser().subscribe(data=>{
                for(var i=0;i<data.length;i++)
                {
                    if(this.nav.address===data[i].address)
                    {
                        this.actual=data[i].actualbalance;
                        this.available=data[i].availablebalance;
                    }
                }
                 
            });
            this.nav.getBalance(this.nav.address).subscribe(res=>{
                var balance=parseInt(""+res);
                if(balance>this.actual){
                    this.haveDepositors = true;
                    console.log(balance);
                    console.log(this.actual);
                    this.deposits = balance - this.actual;
                    console.log(this.deposits);

                    this.nav.updateActualBalance(this.nav.id,balance).subscribe(
                        data=>console.log(data),
                        err=>console.log(err));
                    this.nav.updateAvailableBalance(this.nav.id,balance).subscribe(
                        data=>console.log(data),
                        err=>console.log(err));
                    this.nav.transactionsRev(this.nav.address, this.deposits).subscribe(
                        data=>console.log(data),
                        err=>console.log(err));

                }
                else
                {
                    this.haveDepositors = false;
                }
            });
        },5000);
    }
    address:any=[];
    actual=0;
    available=0;
    deposits=0;
    haveDepositors = false;
    transactionsRev:any=[];

    ngOnInit(){
        this.nav.hide();
        let that=this;
        this.address = this.nav.address;
        
        //console.log(this.deposits);
        this.nav.getUser().subscribe(data=>{
            for(var i=0;i<data.length;i++)
            {
                if(this.nav.address===data[i].address)
                {
                    this.actual=data[i].actualbalance;
                    this.available=data[i].availablebalance;
                }
            }
             
        });
        setTimeout(()=>{
            this.nav.getArrayTransactionRev().subscribe(data=>{
                for (var i = 0;i<data.length; i++) {
                    if (data[i].idwallet===this.nav.address) {
                        this.transactionsRev=data[i];
                    }
                }
            })
        },5000);
    }
      
}