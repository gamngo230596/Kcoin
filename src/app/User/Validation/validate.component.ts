import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-validate',
    templateUrl: './validate.component.html',
    styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit{
	
    constructor(public nav: NavService,public route :ActivatedRoute){
    	
    }
    ngOnInit(){
    	//this.route.navigate(['./signin']);
    	this.nav.hide();
    	this.nav.activeUser(this.route.snapshot.params.id);
    	console.log(this.route.snapshot.params.id);
    	console.log(this.route);
    }
    
}