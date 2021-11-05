import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

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
    this.viewCustJobDataAddressEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataEmpOthBiz.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataOthBizAdress.viewInput =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
  }
}
