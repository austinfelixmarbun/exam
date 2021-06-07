import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-customer-update-master',
  templateUrl: './customer-update-master.component.html',
  styles: []
})
export class CustomerUpdateMasterComponent implements OnInit {
  inputPagingObj: UcPagingObj= new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchUpdateMasterCust.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchUpdateMasterCust.json";
    this.inputPagingObj.deleteUrl = "";
  }
}
