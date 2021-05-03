import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

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
    this.viewCustJobDataEmp.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmp.json";
    this.viewCustJobDataEmpOthBiz.viewInput =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataOthBizAdress.viewInput =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
  }
}
