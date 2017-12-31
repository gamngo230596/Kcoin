import { Component,OnInit } from '@angular/core';
import { NavService,IMessage } from '../../Service/nav.service';
import { Router } from '@angular/router'
import * as Crypto from 'crypto-js';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit{
    constructor(public nav: NavService){
    	console.log(Crypto.HmacSHA1("Message", "Key").toString());
    }
    router : Router;
    form;
    UserCurr:any=[];
    messageErr;
    message: IMessage={};
    ngOnInit(){
    	this.nav.hide();
        let that=this;
        this.nav.getUser().subscribe(users=>{that.UserCurr=users});
        setTimeout(()=>{console.log(this.UserCurr);},5000);
    	let passwordMatchValidator=function(fg: FormGroup){
    		console.log(fg.get('password').value);
    		return fg.get('password').value===fg.get('confirm').value ? null : {'mismatch':true}
    	}
    	this.form=new FormGroup({
    		email: new FormControl("",Validators.compose([
    			Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")	
			])),
			firstname: new FormControl("",Validators.compose([
				Validators.required,Validators.minLength(1),Validators.maxLength(10)
			])),
			lastname: new FormControl("",Validators.compose([
				Validators.required,Validators.minLength(1),Validators.maxLength(10)
			])),
			password: new FormControl("",Validators.compose([
				Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
			])),
			confirm: new FormControl("",Validators.compose([
				Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$")
			]))
    	},passwordMatchValidator);
    	
    }
    SignUp(userInfo){
        console.log(this.UserCurr.length);
        let objuser={
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            password: Crypto.AES.encrypt(userInfo.password,"secret key").toString(),
            idwallet: Crypto.HmacSHA1(Math.random().toString(),"secret key").toString()
        }
       if(this.UserCurr.length===0)
        {
            this.messageErr='';
            let that=this;
            this.nav.addUser(objuser).subscribe(
            data=>console.log(data),
            error=>console.log(error),
            ()=>this.messageErr="Check Mail!");
            let obj={
                email: userInfo.email,
                id:objuser.idwallet
            }
            console.log(this.messageErr);
            this.message=obj;
            console.log(this.message);
            
             
            setTimeout(()=>{
                    this.nav.sendEmail(this.message).subscribe(res=>{
                    console.log('Success!',res);
                },error=>{
                    console.log('Err',error);
                })
            },5000);
        }
        else {
            if(!this.checkEmail(userInfo.email)){
                this.messageErr='';
                let that=this;
                this.nav.addUser(objuser).subscribe(
                data=>console.log(data),
                error=>console.log(error),
                ()=>this.messageErr="Check Mail!");
                let obj={
                    email:  userInfo.email,
                    id:objuser.idwallet
                }
                console.log(this.messageErr);
                this.message=obj;
                console.log(this.message);
                
                setTimeout(()=>{
                        this.nav.sendEmail(this.message).subscribe(res=>{
                        console.log('Success!',res);
                    },error=>{
                        console.log('Err',error);
                    })
                },5000);
                
            }
            else {
                this.messageErr="Trùng!"
            }
        }
        
        
            
        
       
           
    }
    checkEmail(email){
        for(let i=0;i<this.UserCurr.length;i++)
        {
            if(email===this.UserCurr[i].email)
            {
                return true;
            }
        }
        return false;
    }
}