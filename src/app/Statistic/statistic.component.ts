import { Component } from '@angular/core';
import { NavService,IMessage } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
    constructor(public nav: NavService,private route: Router){
             
    }
    user=0;
    actual=0;
    available=0;
    UserCurr:any=[];
    ngOnInit(){
    	this.nav.getUser().subscribe(data=>{this.UserCurr=data});
    	setTimeout(()=>{
    		this.user=this.user+this.UserCurr.length;
    		for(var i=0;i<this.UserCurr.length;i++){
    			this.actual+=this.UserCurr[i].actualbalance;
    			this.available+=this.UserCurr[i].availablebalance;
    		}
    	},3000);
    }
}