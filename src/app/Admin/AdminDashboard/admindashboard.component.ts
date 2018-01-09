import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-admindashboard',
    templateUrl: './admindashboard.component.html',
    styleUrls: ['./admindashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
    constructor(public nav: NavService,public route :ActivatedRoute,public router:Router){
    
    }
    ngOnInit(){       
    	if(!this.nav.flagSignInAdmin){
    		this.router.navigate(['./admin']);
    	}
    }
    SignOutAdmin(){
    	this.nav.setSignOutAdmin();
    	this.router.navigate(['./admin']);
    }
    
}