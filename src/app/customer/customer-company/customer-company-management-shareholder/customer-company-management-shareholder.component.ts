import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-customer-company-management-shareholder',
  templateUrl: './customer-company-management-shareholder.component.html',
  styleUrls: []
})
export class CustomerCompanyManagementShareholderComponent implements OnInit {
  @Input() custCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  mode: string;
  CustCompanyMgmntShrholderId: number;

  constructor() {
  }

  ngOnInit() {
    this.mode = "check";
    console.log(this.custCompanyId);
  }
  terimaValue(ev) {
    console.log(ev);
    this.mode = ev.mode;
    this.CustCompanyMgmntShrholderId = ev.CustCompanyMgmntShrholderId;

    if (ev.stepMode != undefined) {
      this.outputTab.emit({ stepMode: ev.stepMode })
    }
  }
}