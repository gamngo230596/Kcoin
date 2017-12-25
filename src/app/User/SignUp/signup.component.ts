import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service';
import { FormGroup, FormControl, Validators,FormBuilder, AbstractControl } from '@angular/forms';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit{
	
    constructor(public nav: NavService){
    	
    }
    form;

    ngOnInit(){
    	this.nav.hide();
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

}