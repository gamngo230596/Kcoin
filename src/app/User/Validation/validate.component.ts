import { Component,OnInit } from '@angular/core';
import { NavService } from '../../Service/nav.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
    selector: 'app-validate',
    templateUrl: './validate.component.html',
    styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit{
	actived;
    UserCurr:any=[];
    constructor(public nav: NavService,public route :ActivatedRoute,public router:Router){
    	this.actived=false;
        let url="http://localhost:3000/api/admin/"+this.route.snapshot.params.id;
        console.log(url);
    }
    ngOnInit(){
    	//this.route.navigate(['./signin']);
       
    	this.nav.hide();
        let that=this;
        this.nav.getUser().subscribe(users=>{that.UserCurr=users});
        setTimeout(()=>{
            for(var i=0;i<this.UserCurr.length;i++){
               
            if(this.route.snapshot.params.id===this.UserCurr[i].idwallet)
            {
               
                this.nav.activeUser(this.UserCurr[i]._id.toString()).subscribe(
                data=>console.log(data),
                ()=>this.actived=true)
               
            }
        }
        },5000);
        
    	
        if(this.actived){
            this.router.navigate(['./signin']);
        }
    }
    
}