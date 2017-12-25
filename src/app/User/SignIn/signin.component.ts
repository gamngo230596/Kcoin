import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service'
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit{
    constructor(public nav: NavService){}
    ngOnInit(){
    	this.nav.hide();
    }
}