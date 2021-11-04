import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-personal-job-data',
  templateUrl: './customer-view-personal-job-data.component.html',
  styleUrls: ['./customer-view-personal-job-data.component.scss']
})
export class CustomerViewPersonalJobDataComponent implements OnInit {
  viewCustJobData : UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataAddress : UcViewGenericObj = new UcViewGenericObj();

  constructor() { }
  ngOnInit() {
    this.viewCustJobData.viewInput =  "./assets/ucviewgeneric/viewCustJobData.json";
    this.viewCustJobDataAddress.viewInput = "./assets/ucviewgeneric/viewCustJobDataAddress.json";
  }
}
