import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
@Component({
    selector: 'app-adminsignin',
    templateUrl: './adminsignin.component.html',
    styleUrls: ['./adminsignin.component.css']
})
export class AdminSignInComponent implements OnInit{
    constructor(public nav: NavService,public route :ActivatedRoute,public router:Router){
    
    }
    frmSignIn;
    messageErr;
    ngOnInit(){       
    	this.frmSignIn=new FormGroup({
        	ID: new FormControl(),
        	password: new FormControl()
        })
    }
    SignInAdmin(info){
    	if(info.ID==="admin" && info.password==="admin123"){
            this.nav.setSignInAdmin();
    		this.router.navigate(['/admindashboard']);
    	}
    	else
    	{
    		this.messageErr="Invalid ID or Password!";
    	}
    }
    
}