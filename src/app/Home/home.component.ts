import { Component,OnInit } from '@angular/core';
import { NavService } from '../Service/nav.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(public nav: NavService){}
    ngOnInit(){
	this.nav.show();
}
}
