import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router'
import * as Crypto from 'crypto-js';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit{
    constructor(public nav: NavService,public route :Router){
    }
    frmSignIn;
    UserCurr:any;
    ngOnInit(){
    	this.nav.hide();
    	let that=this;
        this.nav.getUser().subscribe(users=>{that.UserCurr=users});
        setTimeout(()=>{console.log(this.UserCurr);},2500);
        this.frmSignIn=new FormGroup({
        	ID: new FormControl(),
        	password: new FormControl()
        })
    }
    SignIn(user){
    	let info={
    		ID: user.ID,
    		password: Crypto.AES.decrypt(user.password,"secret key")
    	}
    	for(let i=0;i<this.UserCurr.length;i++)
    	{
    		let pass=Crypto.AES.decrypt(this.UserCurr[i].password,"secret key")
    		if(this.UserCurr[i]._id===info.ID && pass===info.password && this.UserCurr[i].active)
    		{
    			this.nav.setSignIn();
    			this.route.navigate(['/dashboard']);
    		}
    	}
    }
}