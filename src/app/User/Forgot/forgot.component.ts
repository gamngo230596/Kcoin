import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service'
@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit{
    constructor(public nav: NavService){}
    ngOnInit(){
    	this.nav.hide();
    }
}