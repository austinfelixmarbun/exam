import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-personal-job-data-non-prof-x',
  templateUrl: './customer-view-personal-job-data-non-prof-x.component.html'
})
export class CustomerViewPersonalJobDataNonProfXComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }
  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/impl/ucviewgeneric/viewCustJobDataNonProf.json";
  }
}
