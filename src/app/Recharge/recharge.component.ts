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
    ngOnInit(){
    	
    }
     
}