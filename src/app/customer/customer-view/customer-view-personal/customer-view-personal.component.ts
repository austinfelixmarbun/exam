import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal',
  templateUrl: './customer-view-personal.component.html',
  styleUrls: ['./customer-view-personal.component.scss']
})
export class CustomerViewPersonalComponent implements OnInit {
  viewCustMainInfoHeaderObj : any;
  constructor() { }

  ngOnInit() {
    this.viewCustMainInfoHeaderObj =  "./assets/ucviewgeneric/viewCustMainInfoHeader.json";
    
  }

}
