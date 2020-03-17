import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal-detail',
  templateUrl: './customer-view-personal-detail.component.html',
  styleUrls: ['./customer-view-personal-detail.component.scss']
})
export class CustomerViewPersonalDetailComponent implements OnInit {
  viewCustMainDataMainInfo : any;
  viewCustMainDataContactInformation: string;
  constructor() { }

  ngOnInit() {
    this.viewCustMainDataMainInfo =  "./assets/ucviewgeneric/viewCustMainDataMainInfo.json";
    this.viewCustMainDataContactInformation = "./assets/ucviewgeneric/viewCustMainDataContactInformation.json";
  }

}
