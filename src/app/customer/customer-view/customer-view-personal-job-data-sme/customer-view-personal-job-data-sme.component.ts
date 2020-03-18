import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal-job-data-sme',
  templateUrl: './customer-view-personal-job-data-sme.component.html',
  styleUrls: ['./customer-view-personal-job-data-sme.component.scss']
})
export class CustomerViewPersonalJobDataSmeComponent implements OnInit {
  viewCustJobDataSme: string;
  viewCustJobDataAddressEmp: string;
  viewCustJobDataEmpOthBiz: string;
  viewCustJobDataOthBizAdress: string;

  constructor() { }

  ngOnInit() {
    this.viewCustJobDataSme =  "./assets/ucviewgeneric/viewCustJobDataSme.json";
    this.viewCustJobDataAddressEmp =  "./assets/ucviewgeneric/viewCustJobDataAddressEmp.json";
    this.viewCustJobDataEmpOthBiz =  "./assets/ucviewgeneric/viewCustJobDataEmpOthBiz.json";
    this.viewCustJobDataOthBizAdress =  "./assets/ucviewgeneric/viewCustJobDataOthBizAdress.json";
  }

}
