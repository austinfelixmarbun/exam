import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-view-personal-job-data-non-prof',
  templateUrl: './customer-view-personal-job-data-non-prof.component.html'
})
export class CustomerViewPersonalJobDataNonProfComponent implements OnInit {
  viewCustJobData: string;

  constructor() { }
  ngOnInit() {
    this.viewCustJobData =  "./assets/ucviewgeneric/viewCustJobDataNonProf.json";
  }
}
