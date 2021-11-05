import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
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
    this.viewCustCoyViewContactInformation.viewInput  = "./assets/ucviewgeneric/viewCustCoyViewContactInformation.json";
    this.viewCustCoyViewContactAddress.viewInput  =  "./assets/ucviewgeneric/viewCustCoyViewContactAddress.json";
  }
}