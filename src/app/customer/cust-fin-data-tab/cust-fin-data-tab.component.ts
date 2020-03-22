import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

// Implementation : <app-cust-fin-data-tab [CustId]="'2'" [MrCustTypeCode]="'PERSONAL'" (CustFinDataResponse)="getResponse($event)"></app-cust-fin-data-tab>

@Component({
  selector: 'app-cust-fin-data-tab',
  templateUrl: './cust-fin-data-tab.component.html',
  styleUrls: ['./cust-fin-data-tab.component.scss']
})
export class CustFinDataTabComponent implements OnInit {
  @Input() MrCustTypeCode: string;
  @Input() CustId: number;
  @Output() CustFinDataResponse: EventEmitter<any> = new EventEmitter();
  sourceOfIncomeList: any;

  CustPersonalFinDataForm = this.fb.group({
    CustPersonalFinDataId: [0, [Validators.required]],
    CustPersonalId: [0, [Validators.required]],
    MonthlyIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]],
    MonthlyExpenseAmt: ['', [Validators.pattern('^[0-9]+$')]],
    MonthlyInstallmentAmt: ['', [Validators.pattern('^[0-9]+$')]],
    MrSourceOfIncomeCode: [''],
    SpouseMonthlyIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]],
    IsJoinIncome: [false],
    RowVersion: ['']
  });

  CustCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0, [Validators.required]],
    CustCompanyId: [0, [Validators.required]],
    GrossMonthlyIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]], 
    GrossProfitAmt: ['', [Validators.pattern('^[0-9]+$')]],
    ReturnOfInvestmentPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ReturnOfEquityPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ReturnOfAssetPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ProfitMarginPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    CurrentRatioPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    DebtEquityRatioPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    InvTurnOverPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ArTurnOverPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    GrowthPrcnt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    WorkingCapitalAmt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    OthMonthlyInstAmt: ['', [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    DateAsOf: ['', [Validators.required]],
    Revenue: ['', [Validators.pattern('^[0-9]+$')]],
    OprCost: ['', [Validators.pattern('^[0-9]+$')]],
    ProfitBeforeTax: ['', [Validators.pattern('^[0-9]+$')]],
    CurrAsset: ['', [Validators.pattern('^[0-9]+$')]],
    NetFixedAsset: ['', [Validators.pattern('^[0-9]+$')]],
    TotalAsset: ['', [Validators.pattern('^[0-9]+$')]],
    CurrLiablts: ['', [Validators.pattern('^[0-9]+$')]],
    LongTemrLiablts: ['', [Validators.pattern('^[0-9]+$')]],
    ShareholderEquity: ['', [Validators.pattern('^[0-9]+$')]],
    CurrRatio: ['', [Validators.pattern('^[0-9]+$')]],
    RowVersion: ['']
  });

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if(this.MrCustTypeCode == "PERSONAL"){
      var refMasterSourceIncome = new RefMasterObj();
      refMasterSourceIncome.RefMasterTypeCode = 'SOURCE_INCOME';
      this.httpClient.post(AdInsConstant.GetListActiveRefMaster, refMasterSourceIncome).subscribe(
        (response) => {
          this.sourceOfIncomeList = response;
        },
        (error) => {
          console.log("ERROR");
          console.log(error);
        }
      );
    }
  }

  getCustFinData(){
    var response;

    if(this.MrCustTypeCode == "PERSONAL"){
      response = this.CustPersonalFinDataForm.value;
    }
    else if(this.MrCustTypeCode == "COMPANY"){
      response = this.CustCompanyFinDataForm.value;
    }

    this.CustFinDataResponse.emit(response);
  }

}
