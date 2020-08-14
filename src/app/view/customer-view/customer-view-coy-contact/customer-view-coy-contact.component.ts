import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-coy-contact',
  templateUrl: './customer-view-coy-contact.component.html'
})
export class CustomerViewCoyContactComponent implements OnInit {
  responseResult: any;
  CustId: number;
  viewCustCoyViewContactData: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyViewContactAddress: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyViewContactInformation: UcViewGenericObj = new UcViewGenericObj();

  constructor(){}

  ngOnInit() {
    this.viewCustCoyViewContactData.viewInput  =  "./assets/ucviewgeneric/viewCustCoyViewContactData.json";
    this.viewCustCoyViewContactData.viewEnvironment = environment.FoundationR3Url;
    this.viewCustCoyViewContactInformation.viewInput  = "./assets/ucviewgeneric/viewCustCoyViewContactInformation.json";
    this.viewCustCoyViewContactInformation.viewEnvironment = environment.FoundationR3Url;
    this.viewCustCoyViewContactAddress.viewInput  =  "./assets/ucviewgeneric/viewCustCoyViewContactAddress.json";
    this.viewCustCoyViewContactAddress.viewEnvironment = environment.FoundationR3Url;
  }
}