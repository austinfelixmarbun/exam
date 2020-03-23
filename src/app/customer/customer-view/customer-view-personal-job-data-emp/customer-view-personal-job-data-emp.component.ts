import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal-job-data-emp',
  templateUrl: './customer-view-personal-job-data-emp.component.html',
  styleUrls: ['./customer-view-personal-job-data-emp.component.scss']
})
export class CustomerViewPersonalJobDataEmpComponent implements OnInit {
  viewCustMainDataMainInfo: string;
  viewCustJobDataEmp: any;
  viewCustJobDataEmpOthBiz: string;
  viewCustJobDataOthBizAdress: string;

  constructor() { }
  ngOnInit() {
    this.viewCustMainDataMainInfo =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataEmp =  "./assets/ucviewgeneric/viewCustJobDataEmp.json";
    this.viewCustJobDataEmpOthBiz =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataOthBizAdress =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
  }
}
