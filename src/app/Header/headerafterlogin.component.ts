import { Component } from '@angular/core';
import { NavService } from '../Service/nav.service'

@Component({
    selector: 'app-headerafterlogin',
    templateUrl: './headerafterlogin.component.html',
    styleUrls: ['./headerafterlogin.component.css']
})
export class HeaderAfterLoginComponent {
    constructor(public nav: NavService){}
    ngOnInit(){
    	console.log(this.nav.visible);
    }
}