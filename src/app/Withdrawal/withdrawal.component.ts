import { Component } from '@angular/core';
import { NavService,IMessage } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent {
    constructor(public nav: NavService,private route: Router){
        setTimeout(()=>{

        },60000);
    }
    actual=0;
    available=0;
    status;
    messageErr;
    message:IMessage={}
    transaction:any=[];
    ngOnInit(){
        console.log(this.nav.address);
        if(this.nav.address!=="" && this.nav.id!=="")
        {
    	this.nav.getBalance(this.nav.address).subscribe(balance=>{this.actual=balance;this.available=balance});
       	setTimeout(()=>{
             this.nav.updateActualBalance(this.nav.id,this.actual).subscribe(
                data=>console.log(data),
                error=>console.log(error));
            this.nav.updateAvailableBalance(this.nav.id,this.available).subscribe(
                data=>console.log(data),
                error=>console.log(error));
        },4000);
        this.nav.getTransaction(this.nav.address).subscribe(trans=>{this.transaction=trans});
        setTimeout(()=>{console.log(this.transaction);},4000); 
    }
        
    }
    Send(address,money){
    	this.nav.transactionsHis(this.nav.address,address,this.status).subscribe(
            data=>console.log(data),
            error=>console.log(error),
            ()=>this.messageErr="Success!");

    }
    VerifyTrans(code){
        for(let i=0;i<this.transaction.length;i++)
        {
            if(this.transaction[i].address.toString()===code.toString()){
                if(this.nav.email!=="")
                {
                    let obj={
                        email: this.nav.email,
                        id:this.transaction[i]._id
                    }
                    this.message=obj;
                    /*setTimeout(()=>{
                        this.nav.sendEmailStatus(this.message).subscribe(res=>{
                            console.log('Success!',res);
                        },error=>{
                            console.log('Err',error);
                        });
                    },2000);*/
                    
                }
                
            }
        }
    }

     
}