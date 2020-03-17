import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal-job-data',
  templateUrl: './customer-view-personal-job-data.component.html',
  styleUrls: ['./customer-view-personal-job-data.component.scss']
})
export class CustomerViewPersonalJobDataComponent implements OnInit {
  viewCustJobData: string;

  constructor() { }

  ngOnInit() {
    this.viewCustJobData =  "./assets/ucviewgeneric/viewCustJobData.json";
  }

}
