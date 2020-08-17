import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-sme',
  templateUrl: './customer-view-personal-job-data-sme.component.html',
  styleUrls: ['./customer-view-personal-job-data-sme.component.scss']
})
export class CustomerViewPersonalJobDataSmeComponent implements OnInit {
  viewCustJobDataSme: UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataAddressEmp: UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataEmpOthBiz: UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataOthBizAdress: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }

  ngOnInit() {
    this.viewCustJobDataSme.viewInput =  "./assets/ucviewgeneric/viewCustJobDataSme.json";
    this.viewCustJobDataSme.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataAddressEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataAddressEmp.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataEmpOthBiz.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataEmpOthBiz.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataOthBizAdress.viewInput =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
    this.viewCustJobDataOthBizAdress.viewEnvironment = environment.FoundationR3Url;
  }
}
