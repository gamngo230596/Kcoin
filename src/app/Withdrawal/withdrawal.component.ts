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
        setInterval(()=>{
            this.nav.getBalance(this.nav.address).subscribe(res=>{
                var balance=parseInt(""+res);
                if(balance<this.actual){
                    for(var j=0;j<this.transaction.length;j++)
                    {
                        if(this.transaction[j].status==="Đang xử lí")
                        {
                            this.nav.updateStatus(this.transaction[j]._id,"Hoàn thành").subscribe(
                            data=>console.log(data),
                            err=>console.log(err));
                            this.nav.updateActualBalance(this.nav.id,balance).subscribe(
                            data=>console.log(data),
                            err=>console.log(err));
                        }
                    }
                }
            });
        },60000);
    }
    checkreceive:any=[];
    actual=0;
    available=0;
    status;
    messageErr;
    message:IMessage={}
    transaction:any=[];
    check:any=[];
    notSend=true;
    messageErr2;
    ngOnInit(){
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
        if(this.nav.address!=="" && this.nav.id!=="")
        {
       this.nav.getTransaction(this.nav.address).subscribe(trans=>{this.transaction=trans});
        setTimeout(()=>{
            for(var i=0;i<this.transaction.length;i++)
            {
                if(this.transaction[i].status==="Đang xử lí")
                {
                    this.notSend=false;
                    var change=parseInt(""+this.available)-parseInt(""+this.transaction[i].money);
                    this.available=change;
                    this.nav.updateAvailableBalance(this.transaction[i]._id,this.available).subscribe(
                    data=>console.log(data),
                    error=>console.log(error));
                    this.nav.withdrawal(this.transaction[i].address,this.transaction[i].money,this.nav.address).subscribe(
                        data=>console.log(data),
                        error=>console.log(error));
                }
            }
                
        },4000); 
    }
        
    }
    Send(address,money){
        if(this.available<money)
        {
            this.messageErr2="Not Enough Money!";
        }
        else{
            this.nav.transactionsHis(this.nav.address,address,"Khởi tạo",money).subscribe(
            data=>console.log(data),
            error=>console.log(error),
            ()=>this.messageErr="Success!");
        }
    	
    }
    VerifyTrans(addressreceived,money){
        if(this.nav.address!=="")
        {
            this.nav.checkAddressAvailable(this.nav.address).subscribe(data=>{this.check=data});
        
        setTimeout(()=>{
            if(this.check.length===0)
            {
                for(let i=0;i<this.transaction.length;i++)
                {
                    if(this.transaction[i].address.toString()===addressreceived.toString()){
                        if(this.nav.email!=="")
                        {
                            let obj={
                                email: this.nav.email,
                                id:this.transaction[i]._id
                            }
                            this.message=obj;
                            this.nav.settransaction(addressreceived,money);
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
            else{
                this.messageErr="Address not available!";
            }
        },3000);
    }
        
    }

     
}