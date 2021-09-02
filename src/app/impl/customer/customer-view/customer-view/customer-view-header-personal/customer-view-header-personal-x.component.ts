import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-customer-view-header-personal-x',
  templateUrl: './customer-view-header-personal-x.component.html'
})
export class CustomerViewHeaderPersonalXComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustPersonalHeaderX.json";
  }
}


