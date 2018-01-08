import { Component, OnInit } from '@angular/core';
import { NavService,IMessage  } from './Service/nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public nav: NavService){}
  ngOnInit(){
  }
}
