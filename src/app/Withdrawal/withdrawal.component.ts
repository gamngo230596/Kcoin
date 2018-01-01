import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent {
    constructor(public nav: NavService,private route: Router){}
    ngOnInit(){
    	
    }
     
}