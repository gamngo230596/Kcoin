import { Component,OnInit } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-validatestatus',
    templateUrl: './validatestatus.component.html',
    styleUrls: ['./validatestatus.component.css']
})
export class ValidateStatusComponent implements OnInit{
    constructor(public nav: NavService,public route :ActivatedRoute,public router:Router){
        this.nav.getUser().subscribe(user=>{this.UseCurr=user});
    }
    UseCurr:any=[];
    available=0;
    address;
    money=0;
    ngOnInit(){       
    	this.nav.hide();
        this.nav.updateStatus(this.route.snapshot.params.id,"Đang xử lí").subscribe(
            data=>console.log(data),
            error=>console.log(error),
            ()=>{
                this.nav.getArrayTransaction().subscribe(data=>{
                    for(var i=0;i<data.length;i++)
                    {
                        if(data[i]._id===this.route.snapshot.params.id){
                            this.address=data[i].addressmain;
                            this.money=data[i].money;
                            this.nav.withdrawal(data[i].address,data[i].money,data[i].addressmain).subscribe(
                            data=>console.log(data),
                            error=>console.log(error));
                        }
                    }
                    for(var j=0;j<this.UseCurr.length;j++)
                    {
                        if(this.UseCurr[j].address===this.address)
                        {
                            var change=parseInt(""+this.UseCurr[j].availablebalance)-parseInt(""+this.money);
                            this.nav.updateAvailableBalance(this.UseCurr[j]._id,change).subscribe(
                            data=>console.log(data),
                            error=>console.log(error));
                        }
                    }
                });
            });
        setTimeout(()=>{
            this.router.navigate(['./signin']);
        },10000);
    	
    }
    
}