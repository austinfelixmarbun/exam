import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalFinDataObj } from 'app/shared/model/CustPersonalFinDataObj.Model';
import { CustCompanyFinDataObj } from 'app/shared/model/CustCompanyFinDataObj.Model';

// Implementation : <app-cust-fin-data-tab [CustId]="'2'" [MrCustTypeCode]="'PERSONAL'" (CustFinDataResponse)="getResponse($event)"></app-cust-fin-data-tab>

@Component({
  selector: 'app-cust-fin-data-tab',
  templateUrl: './cust-fin-data-tab.component.html',
  styleUrls: ['./cust-fin-data-tab.component.scss'],
  providers: [NGXToastrService]
})
export class CustFinDataTabComponent implements OnInit {
  @Input() MrCustTypeCode: string;
  @Input() CustId: number;
  @Input() Mode: string;
  @Input() CustModeId: number;
  @Output() CustFinDataResponse: EventEmitter<any> = new EventEmitter();
  sourceOfIncomeList: any;
  isCalculated: boolean;

  CustPersonalFinDataForm = this.fb.group({
    CustPersonalFinDataId: [0, [Validators.required]],
    CustPersonalId: [0, [Validators.required]],
    MonthlyIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]],
    MonthlyExpenseAmt: ['', [Validators.pattern('^[0-9]+$')]],
    MonthlyInstallmentAmt: ['', [Validators.pattern('^[0-9]+$')]],
    MrSourceOfIncomeCode: [''],
    SpouseMonthlyIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]],
    IsJoinIncome: [false],
    TotalIncomeAmt: [0],
    NettIncomeAmt: [0],
    NettProfitMonthlyAmt: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    OtherIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]],
    OtherMonthlyInstAmt: ['', [Validators.pattern('^[0-9]+$')]],
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
    DateAsOf: [''],
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
  ) { 
    this.isCalculated = false;
  }

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

    if(this.Mode == "edit"){
      if(this.MrCustTypeCode == "PERSONAL"){
        var custPersonalFinData = new CustPersonalFinDataObj();
        custPersonalFinData.CustPersonalId = this.CustModeId;
        this.httpClient.post(AdInsConstant.GetCustPersonalFinDataByCustPersonalId, custPersonalFinData).subscribe(
          (response: any) => {
            this.CustPersonalFinDataForm.patchValue({
              CustPersonalFinDataId: response.CustPersonalFinDataId,
              CustPersonalId: response.CustPersonalId,
              MonthlyIncomeAmt: response.MonthlyIncomeAmt,
              MonthlyExpenseAmt: response.MonthlyExpenseAmt,
              MonthlyInstallmentAmt: response.MonthlyInstallmentAmt,
              MrSourceOfIncomeCode: response.MrSourceOfIncomeCode,
              SpouseMonthlyIncomeAmt: response.SpouseMonthlyIncomeAmt,
              IsJoinIncome: response.IsJoinIncome,
              TotalIncomeAmt: response.TotalIncomeAmt,
              NettIncomeAmt: response.NettIncomeAmt,
              NettProfitMonthlyAmt: response.NettProfitMonthlyAmt,
              OtherIncomeAmt: response.OtherIncomeAmt,
              OtherMonthlyInstAmt: response.OtherMonthlyInstAmt,
              RowVersion: response.RowVersion
            });
          },
          (error) => {
            console.log("ERROR");
            console.log(error);
          }
        );
      }
      else if(this.MrCustTypeCode == "COMPANY"){
        var custCompanyFinData = new CustCompanyFinDataObj();
        custCompanyFinData.CustCompanyId = this.CustModeId;
        this.httpClient.post(AdInsConstant.GetCustCompanyFinDataByCustCompanyId, custCompanyFinData).subscribe(
          (response: any) => {
            this.CustCompanyFinDataForm.patchValue({
              CustCompanyFinDataId: response.CustCompanyFinDataId,
              CustCompanyId: response.CustCompanyId,
              GrossMonthlyIncomeAmt: response.GrossMonthlyIncomeAmt,
              GrossProfitAmt: response.GrossProfitAmt,
              ReturnOfInvestmentPrcnt: response.ReturnOfInvestmentPrcnt,
              ReturnOfEquityPrcnt: response.ReturnOfEquityPrcnt,
              ReturnOfAssetPrcnt: response.ReturnOfAssetPrcnt,
              ProfitMarginPrcnt: response.ProfitMarginPrcnt,
              CurrentRatioPrcnt: response.CurrentRatioPrcnt,
              DebtEquityRatioPrcnt: response.DebtEquityRatioPrcnt,
              InvTurnOverPrcnt: response.InvTurnOverPrcnt,
              ArTurnOverPrcnt: response.ArTurnOverPrcnt,
              GrowthPrcnt: response.GrowthPrcnt,
              WorkingCapitalAmt: response.WorkingCapitalAmt,
              OthMonthlyInstAmt: response.OthMonthlyInstAmt,
              DateAsOf: response.DateAsOf,
              Revenue: response.Revenue,
              OprCost: response.OprCost,
              ProfitBeforeTax: response.ProfitBeforeTax,
              CurrAsset: response.CurrAsset,
              NetFixedAsset: response.NetFixedAsset,
              TotalAsset: response.TotalAsset,
              CurrLiablts: response.CurrLiablts,
              LongTemrLiablts: response.LongTemrLiablts,
              ShareholderEquity: response.ShareholderEquity,
              CurrRatio: response.CurrRatio,
              RowVersion: response.RowVersion,
            });
          },
          (error) => {
            console.log("ERROR");
            console.log(error);
          }
        );
      }
    }
  }

  calculatePersonalFinData(){
    if(this.CustPersonalFinDataForm.valid){
      var formData = this.CustPersonalFinDataForm.value;
      var monthlyIncomeAmt = formData.MonthlyIncomeAmt == "" ? 0 : parseInt(formData.MonthlyIncomeAmt);
      var spouseMonthlyIncomeAmt = formData.SpouseMonthlyIncomeAmt == "" ? 0 : parseInt(formData.SpouseMonthlyIncomeAmt);
      var totalIncomeAmt = formData.TotalIncomeAmt == "" ? 0 : parseInt(formData.TotalIncomeAmt);
      var nettIncomeAmt = formData.NettIncomeAmt == "" ? 0 : parseInt(formData.NettIncomeAmt);
      var nettProfitMonthlyAmt = formData.NettProfitMonthlyAmt == "" ? 0 : parseInt(formData.NettProfitMonthlyAmt);
      var otherIncomeAmt = formData.OtherIncomeAmt == "" ? 0 : parseInt(formData.OtherIncomeAmt);
      var monthlyExpenseAmt = formData.MonthlyExpenseAmt == "" ? 0 : parseInt(formData.MonthlyExpenseAmt);
      var monthlyInstallmentAmt = formData.MonthlyInstallmentAmt == "" ? 0 : parseInt(formData.MonthlyInstallmentAmt);
      var otherMonthlyInstAmt = formData.OtherMonthlyInstAmt == "" ? 0 : parseInt(formData.OtherMonthlyInstAmt);

      var totalAmt = monthlyIncomeAmt + spouseMonthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
      var netIncomeAmt = totalAmt - (monthlyExpenseAmt + monthlyInstallmentAmt + otherMonthlyInstAmt);

      this.CustPersonalFinDataForm.patchValue({
        TotalIncomeAmt: totalAmt,
        NettIncomeAmt: netIncomeAmt
      });
    }
  }

  getCustFinData(){
    var response = {};

    if(this.MrCustTypeCode == "PERSONAL"){
      response["formData"] = this.CustPersonalFinDataForm.value;
    }
    else if(this.MrCustTypeCode == "COMPANY"){
      response["formData"] = this.CustCompanyFinDataForm.value;
    }

    if(this.isCalculated){
      response["status"] = {"code": 200, "message": "Success"};
    }
    else{
      response["status"] = {"code": 500, "message": "Please Calculate First"};
    }

    this.CustFinDataResponse.emit(response);
  }

}
