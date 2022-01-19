import { UcviewgenericComponent } from '@adins/ucviewgeneric';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-header-company',
  templateUrl: './customer-view-header-company.component.html'
})
export class CustomerViewHeaderCompanyComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  private viewGeneric: UcviewgenericComponent;
  @ViewChild('viewGeneric') set content(content: UcviewgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.viewGeneric = content;
    }
  }
  
  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCompanyHeader.json";
  }

  ReloadUcViewGeneric() {
    this.viewGeneric.initiateForm();
  }
}
