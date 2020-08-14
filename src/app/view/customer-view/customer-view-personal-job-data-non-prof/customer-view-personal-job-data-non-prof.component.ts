import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-non-prof',
  templateUrl: './customer-view-personal-job-data-non-prof.component.html'
})
export class CustomerViewPersonalJobDataNonProfComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }
  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustJobDataNonProf.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
  }
}
