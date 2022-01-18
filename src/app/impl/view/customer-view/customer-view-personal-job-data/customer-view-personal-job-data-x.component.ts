import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-x',
  templateUrl: './customer-view-personal-job-data-x.component.html'
})
export class CustomerViewPersonalJobDataXComponent implements OnInit {
  viewCustJobData : UcViewGenericObj = new UcViewGenericObj();
  viewCustJobDataAddress : UcViewGenericObj = new UcViewGenericObj();

  constructor() { }
  ngOnInit() {
    this.viewCustJobData.viewInput =  "./assets/impl/ucviewgeneric/viewCustJobData.json";
    this.viewCustJobDataAddress.viewInput = "./assets/ucviewgeneric/viewCustJobDataAddress.json";
  }
}
