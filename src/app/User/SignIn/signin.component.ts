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
        let that=this;
        this.nav.getUser().subscribe(users=>{that.UserCurr=users});
        setTimeout(()=>{
            console.log(this.UserCurr); 
        },5000);
        
    }
    frmSignIn;
    UserCurr:any=[];
    messageErr;
    ngOnInit(){
    	this.nav.hide();
    	
        this.frmSignIn=new FormGroup({
        	ID: new FormControl(),
        	password: new FormControl()
        })
    }
    SignIn(user){
        let that=this;
        this.nav.getUser().subscribe(users=>{that.UserCurr=users});
        setTimeout(()=>{
            console.log(this.UserCurr);
        },5000);
        setTimeout(()=>{
            let info={
                ID: user.ID,
                password: user.password
            }
        console.log(info.password);
        setTimeout(()=>{
            console.log(info.password);
        },5000);
        for(let i=0;i<this.UserCurr.length;i++)
        {   

            let pass=Crypto.AES.decrypt(this.UserCurr[i].password,"secret key").toString(Crypto.enc.Utf8);
           
            if(this.UserCurr[i].idwallet===info.ID && pass===info.password && this.UserCurr[i].active)
            {
                this.nav.setSignIn();
                    //console.log(this.UserCurr[i].address);
                    this.nav.setidwallet(this.UserCurr[i].address,this.UserCurr[i]._id,this.UserCurr[i].email);
                    this.route.navigate(['/dashboard']);
            }
            else{
                this.messageErr="Incorrect ID or Password";
            }

            
        }
        
    },2000);
    	
    }
}