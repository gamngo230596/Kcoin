import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(public nav: NavService,private route: Router){}
    ngOnInit(){
    	this.nav.hide();
    	if(!this.nav.flagSignIn)
    	{
    		this.route.navigate(['/signin']);
    	}
    }
    SignOut(){
    	this.nav.setSignOut();
    	this.route.navigate(['/signin']);
    }
}