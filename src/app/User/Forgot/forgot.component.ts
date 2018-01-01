import { Component,OnInit } from '@angular/core';
import { NavService,IMessage  } from '../../Service/nav.service';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as Crypto from 'crypto-js';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
    constructor(public nav: NavService){
    	let that=this;
        this.nav.getUser().subscribe(users=>{that.UserCurr=users});
    }
    formForget;
    message:IMessage={};
    randomNumber;
    newpassword;
    email;
    UserCurr:any=[];
    messageErr;
    ngOnInit(){
    	
    	this.nav.hide();
    	let passwordMatchValidator=function(fg: FormGroup){
    		console.log(fg.get('password').value);
    		return fg.get('password').value===fg.get('confirmpassword').value ? null : {'mismatch':true}
    	}
    	this.formForget=new FormGroup({
    		email: new FormControl("",Validators.compose([
    			Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")	
			])),
			password: new FormControl("",Validators.compose([
				Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
			])),
			confirmpassword: new FormControl("",Validators.compose([
				Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
			])),
			verify: new FormControl()
    	},passwordMatchValidator);
    }
    Forgot(newvalue){
    	this.newpassword=Crypto.AES.encrypt(newvalue.password,"secret key").toString();
    	this.randomNumber=Math.floor(Math.random() * (5000 - 1000) + 1000);
    	this.email=newvalue.email;
    	let obj={
                email: newvalue.email,
                id:this.randomNumber.toString()
            }
        this.message=obj;
        console.log(this.UserCurr);
        console.log(this.randomNumber);
        setTimeout(()=>{
        	console.log(this.UserCurr);
        	this.nav.sendEmailValidate(this.message).subscribe(res=>{
            console.log('Success!',res);
            this.messageErr="Check mail!";
        },error=>{
            console.log('Err',error);
        })
        },5000);
    	
    }
    Verify(newvalue){
    	console.log(newvalue);
    	console.log(this.checkID(this.email));
    	if(this.randomNumber.toString()===newvalue.toString())
    	{
    		this.nav.changePassword(this.newpassword,this.checkID(this.email)).subscribe(
                data=>console.log(data),
                error=>console.log(error),
                ()=>this.messageErr="Update success!");
    	}
    }
    checkID(email){
    	for(var i=0;i<this.UserCurr.length;i++){
    		if(email===this.UserCurr[i].email){
    			return this.UserCurr[i]._id;
    		}
    	}
    }
    

}