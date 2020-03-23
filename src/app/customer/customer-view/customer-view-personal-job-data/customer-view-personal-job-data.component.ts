import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-view-personal-job-data',
  templateUrl: './customer-view-personal-job-data.component.html',
  styleUrls: ['./customer-view-personal-job-data.component.scss']
})
export class CustomerViewPersonalJobDataComponent implements OnInit {
  viewCustJobData: string;
  viewCustJobDataAddress: string;

  constructor() { }
  ngOnInit() {
    this.viewCustJobData =  "./assets/ucviewgeneric/viewCustJobData.json";
    this.viewCustJobDataAddress = "./assets/ucviewgeneric/viewCustJobDataAddress.json";
  }
}
