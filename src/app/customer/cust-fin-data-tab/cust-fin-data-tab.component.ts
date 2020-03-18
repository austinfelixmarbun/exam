import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-cust-fin-data-tab',
  templateUrl: './cust-fin-data-tab.component.html',
  styleUrls: ['./cust-fin-data-tab.component.scss']
})
export class CustFinDataTabComponent implements OnInit {
  @Input() MrCustTypeCode: string;
  @Input() CustId: number;
  sourceOfIncomeList: any;

  CustPersonalFinDataForm = this.fb.group({
    CustPersonalFinDataId: [0, [Validators.required]],
    CustPersonalId: [0, [Validators.required]],
    MonthlyIncomeAmt: [0, [Validators.pattern('^[0-9]+$')]],
    MonthlyExpenseAmt: [0, [Validators.pattern('^[0-9]+$')]],
    MonthlyInstallmentAmt: [0, [Validators.pattern('^[0-9]+$')]],
    MrSourceOfIncomeCode: [''],
    SpouseMonthlyIncomeAmt: [0, [Validators.pattern('^[0-9]+$')]],
    IsJoinIncome: [false],
    RowVersion: ['']
  });

  CustCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0, [Validators.required]],
    CustCompanyId: [0, [Validators.required]],
    GrossMonthlyIncomeAmt: [0, [Validators.pattern('^[0-9]+$')]], 
    GrossProfitAmt: [0, [Validators.pattern('^[0-9]+$')]],
    ReturnOfInvestmentPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ReturnOfEquityPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ReturnOfAssetPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ProfitMarginPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    CurrentRatioPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    DebtEquityRatioPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    InvTurnOverPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    ArTurnOverPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    GrowthPrcnt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    WorkingCapitalAmt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    OthMonthlyInstAmt: [0, [Validators.pattern('^[0-9]+$'), Validators.max(100)]],
    DateAsOf: ['', [Validators.required]],
    Revenue: [0, [Validators.pattern('^[0-9]+$')]],
    OprCost: [0, [Validators.pattern('^[0-9]+$')]],
    ProfitBeforeTax: [0, [Validators.pattern('^[0-9]+$')]],
    CurrAsset: [0, [Validators.pattern('^[0-9]+$')]],
    NetFixedAsset: [0, [Validators.pattern('^[0-9]+$')]],
    TotalAsset: [0, [Validators.pattern('^[0-9]+$')]],
    CurrLiablts: [0, [Validators.pattern('^[0-9]+$')]],
    LongTemrLiablts: [0, [Validators.pattern('^[0-9]+$')]],
    ShareholderEquity: [0, [Validators.pattern('^[0-9]+$')]],
    CurrRatio: [0, [Validators.pattern('^[0-9]+$')]],
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
    var response = {};

    if(this.MrCustTypeCode == "PERSONAL"){
      response = this.CustPersonalFinDataForm.value;
    }
    else if(this.MrCustTypeCode == "COMPANY"){
      response = this.CustCompanyFinDataForm.value;
    }

    return response;
  }

}
