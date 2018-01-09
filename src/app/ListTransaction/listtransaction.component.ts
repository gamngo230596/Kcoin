import { Component } from '@angular/core';
import { NavService,IMessage } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-listtransaction',
    templateUrl: './listtransaction.component.html',
    styleUrls: ['./listtransaction.component.css']
})
export class ListTransactionComponent {
    constructor(public nav: NavService,private route: Router){
             
    }
    Transaction:any=[];
    ngOnInit(){
        this.nav.getArrayTransaction().subscribe(data=>{
        	this.Transaction=data;
        });
        setTimeout(()=>{
        	console.log(this.Transaction);
        },3000);
    }

     
}