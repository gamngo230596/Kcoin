import { Component,OnInit } from '@angular/core';
import { NavService } from '../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-validatestatus',
    templateUrl: './validatestatus.component.html',
    styleUrls: ['./validatestatus.component.css']
})
export class ValidateStatusComponent implements OnInit{
    constructor(public nav: NavService,public route :ActivatedRoute,public router:Router){
    
    }
    available=0;
    ngOnInit(){       
    	this.nav.hide();
        this.nav.updateStatus(this.route.snapshot.params.id,"Đang xử lí").subscribe(
            data=>console.log(data),
            error=>console.log(error));
        setTimeout(()=>{
            this.router.navigate(['./signin']);
        },5000);
    	
    }
    
}