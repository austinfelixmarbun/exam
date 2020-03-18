import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cust-bank-acc-detail-section-findata',
  templateUrl: './cust-bank-acc-detail-section-findata.component.html',
  styleUrls: ['./cust-bank-acc-detail-section-findata.component.scss']
})
export class CustBankAccDetailSectionFindataComponent implements OnInit {
  monthOfYear: Array<string>;
  monthOfYearExclude: Array<string>;

  CustBankAccForm = this.fb.group({
    CustBankAccId: [0, [Validators.required]],
    CustId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: [0, [Validators.required]],
    BankAccNo: [0, [Validators.required]],
    BankAccName: [0, [Validators.required]],
    IsBankStmnt: [false],
    BankBranchRegRptCode: [0, [Validators.required]],
    BalanceAmt: [0],
    IsDefault: [false],
    RowVersion: [''],
    CustBankStmnts: this.fb.array([])
  });

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { 
    moment.locale('en');
    this.monthOfYear = new Array(...moment.months());
    this.monthOfYearExclude = new Array(12);
  }

  ngOnInit() {
    
  }

}
