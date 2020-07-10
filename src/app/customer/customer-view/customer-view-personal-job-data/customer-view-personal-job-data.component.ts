import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

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
    this.viewCustJobData.viewEnvironment = environment.FoundationR3Url;
    this.viewCustJobDataAddress.viewInput = "./assets/ucviewgeneric/viewCustJobDataAddress.json";
    this.viewCustJobDataAddress.viewEnvironment = environment.FoundationR3Url;
  }
}
