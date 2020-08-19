import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-emp',
  templateUrl: './customer-view-personal-job-data-emp.component.html',
  styleUrls: ['./customer-view-personal-job-data-emp.component.scss']
})
export class CustomerViewPersonalJobDataEmpComponent implements OnInit {
  viewCustMainDataMainInfo : UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataEmp : UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataEmpOthBiz : UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataOthBizAdress : UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataAddressEmp : UcViewGenericObj = new UcViewGenericObj();

  constructor() { }
  ngOnInit() {
    this.viewCustJobDataAddressEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataAddressEmp.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmp.json";
    this.viewCustJobDataEmp.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataEmpOthBiz.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataEmpOthBiz.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataOthBizAdress.viewInput =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
    this.viewCustJobDataOthBizAdress.viewEnvironment = environment.FoundationR3Url;
  }
}
