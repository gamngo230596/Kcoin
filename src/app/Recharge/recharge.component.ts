import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-recharge',
    templateUrl: './recharge.component.html',
    styleUrls: ['./recharge.component.css']
})
export class RechargeComponent {
    constructor(public nav: NavService,private route: Router){}
    address;
    ngOnInit(){
    	this.nav.hide();
        let that=this;
        this.nav.getUser().subscribe(data=>{that.address = data[0].address});
        setTimeout(()=>{console.log(this.address);},5000);
    }
     
}