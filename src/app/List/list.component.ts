import { Component } from '@angular/core';
import { NavService,IMessage } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    constructor(public nav: NavService,private route: Router){
           
    }
    UserCurr:any=[];
    ngOnInit(){
        this.nav.getUser().subscribe((data)=>{
        	this.UserCurr=data;
        });
        setTimeout(()=>{
        	console.log(this.UserCurr);
        },3000);
    }

     
}