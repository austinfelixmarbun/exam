import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-view-personal-detail',
  templateUrl: './customer-view-personal-detail.component.html',
  styleUrls: ['./customer-view-personal-detail.component.scss']
})
export class CustomerViewPersonalDetailComponent implements OnInit {
  viewCustMainDataMainInfo : UcViewGenericObj = new UcViewGenericObj();
  viewCustMainDataContactInformation: UcViewGenericObj = new UcViewGenericObj();
  constructor(private location: Location) {
    this.location.replaceState("/View/Customer/");
   }

  ngOnInit() {
    console.log("terpanggil");
    this.viewCustMainDataMainInfo.viewInput =  "./assets/ucviewgeneric/viewCustMainDataMainInfo.json";
    this.viewCustMainDataMainInfo.viewEnvironment = environment.FoundationR3Url;
    this.viewCustMainDataContactInformation.viewInput  = "./assets/ucviewgeneric/viewCustMainDataContactInformation.json";
    this.viewCustMainDataContactInformation.viewEnvironment = environment.FoundationR3Url;
  }
}
