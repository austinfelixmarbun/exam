import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-customer-company-management-shareholder',
  templateUrl: './customer-company-management-shareholder.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyManagementShareholderComponent implements OnInit {
  @Input() custCompanyId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  mode: string;
  CustCompanyMgmntShrholderId: number;
  TotalShare: number;

  constructor(private toastr: NGXToastrService) {
  }

  ngOnInit() {
    this.mode = "check";
    console.log(this.custCompanyId);
  }
  terimaValue(ev) {
    console.log(ev);
    this.mode = ev.mode;
    this.CustCompanyMgmntShrholderId = ev.CustCompanyMgmntShrholderId;
    this.TotalShare = ev.TotalShare;

    if (ev.stepMode != undefined) {
      this.outputTab.emit({ stepMode: ev.stepMode })
    }
  }
  next() {
    if(this.TotalShare < 100){
      this.toastr.errorMessage("Total Share less than 100%");
      return;
    }
    this.outputTab.emit({ stepMode: 'next'});
  }
  back() {
    this.outputTab.emit({ stepMode: 'previous'});
  }
}