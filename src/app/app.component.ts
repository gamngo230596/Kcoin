import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ngOnInit(){
  /*setInterval(()=>{
		console.log("lặp!");
		saveNewBlocks("lap").subscribe(
            data=>console.log(data),
            error=>console.log(error));
	},30000);*/
	}
}
