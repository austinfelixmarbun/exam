import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalFinDataObj } from 'app/shared/model/CustPersonalFinDataObj.Model';
import { CustCompanyFinDataObj } from 'app/shared/model/CustCompanyFinDataObj.Model';
import { WizardComponent } from 'angular-archwizard';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';

@Component({
  selector: 'app-cust-fin-data-tab',
  templateUrl: './cust-fin-data-tab.component.html',
  styleUrls: ['./cust-fin-data-tab.component.scss'],
  providers: [NGXToastrService]
})
export class CustFinDataTabComponent implements OnInit {
  @Input() MrCustTypeCode: string;
  @Input() CustId: number;
  // @Output() CustFinDataResponse: EventEmitter<any> = new EventEmitter();
  sourceOfIncomeList: any;
  isCalculated: boolean;
  spouseMonthlyIncomeAmt: number;
  mrMaritalStatCode: string;

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
    NettProfitMonthlyAmt: [0],
    OtherIncomeAmt: ['', [Validators.pattern('^[0-9]+$')]],
    OtherMonthlyInstAmt: [0],
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
    private fb: FormBuilder, 
    private wizard: WizardComponent
  ) {
    if(this.MrCustTypeCode == "PERSONAL"){
      this.isCalculated = false;
    }
    else if(this.MrCustTypeCode == "COMPANY"){
      this.isCalculated = true;
    }
  }

  ngOnInit() {
    if (this.MrCustTypeCode == "PERSONAL") {
      var custPersonalData;
      var custPersonal = new CustPersonalObj();
      custPersonal.CustId = this.CustId;
      this.httpClient.post(AdInsConstant.GetCustPersonalbyCustId, custPersonal).pipe(
        map((response: CustPersonalObj) => {
          this.mrMaritalStatCode = response.MrMaritalStatCode;
          custPersonalData = response;
          return response;
        }),
        mergeMap((response: CustPersonalObj) => {
          var custPersonalFinData = new CustPersonalFinDataObj();
          custPersonalFinData.CustPersonalId = response.CustPersonalId;
          let custFinData = this.httpClient.post(AdInsConstant.GetCustPersonalFinDataByCustPersonalId, custPersonalFinData);
          var refMasterSourceIncome = new RefMasterObj();
          refMasterSourceIncome.RefMasterTypeCode = 'SOURCE_INCOME';
          let sourceIncomeList = this.httpClient.post(AdInsConstant.GetListActiveRefMaster, refMasterSourceIncome);
          return forkJoin([custFinData, sourceIncomeList]);
        })
      ).subscribe(
        (response: any) => {
          var custFinData = response[0];
          var sourceIncome = response[1];
          if(custFinData != null && custFinData != "undefined"){
            if(custFinData.CustPersonalFinDataId != null && custFinData.CustPersonalFinDataId != "undefined" && custFinData.CustPersonalFinDataId != "" && response.CustPersonalFinDataId > 0){
              this.CustPersonalFinDataForm.patchValue({
                CustPersonalFinDataId: custFinData.CustPersonalFinDataId,
                CustPersonalId: custFinData.CustPersonalId,
                MonthlyIncomeAmt: custFinData.MonthlyIncomeAmt,
                MonthlyExpenseAmt: custFinData.MonthlyExpenseAmt,
                MonthlyInstallmentAmt: custFinData.MonthlyInstallmentAmt,
                MrSourceOfIncomeCode: custFinData.MrSourceOfIncomeCode,
                SpouseMonthlyIncomeAmt: custFinData.SpouseMonthlyIncomeAmt,
                IsJoinIncome: custFinData.IsJoinIncome,
                TotalIncomeAmt: custFinData.TotalIncomeAmt,
                NettIncomeAmt: custFinData.NettIncomeAmt,
                NettProfitMonthlyAmt: custFinData.NettProfitMonthlyAmt,
                OtherIncomeAmt: custFinData.OtherIncomeAmt,
                OtherMonthlyInstAmt: custFinData.OtherMonthlyInstAmt,
                RowVersion: custFinData.RowVersion
              });
            }
          }
          if(this.CustPersonalFinDataForm.controls["CustPersonalId"].value == 0){
            this.CustPersonalFinDataForm.patchValue({
              CustPersonalId: custPersonalData.CustPersonalId
            });
          }
          this.sourceOfIncomeList = sourceIncome;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if (this.MrCustTypeCode == "COMPANY") {
      var custCompanyData;
      var custCompany = new CustCompanyObj();
      custCompany.CustId = this.CustId;
      this.httpClient.post(AdInsConstant.GetCustCompanyByCustId, custCompany).pipe(
        map((response: CustCompanyObj) => {
          custCompanyData = response;
          return response;
        }),
        mergeMap((response: CustCompanyObj) => {
          var custCompanyFinData = new CustCompanyFinDataObj();
          custCompanyFinData.CustCompanyId = response.CustCompanyId;
          return this.httpClient.post(AdInsConstant.GetCustCompanyFinDataByCustCompanyId, custCompanyFinData);
        })
      ).subscribe(
        (response: any) => {
          if(response != null && response != "undefined"){
            if(response.CustCompanyFinDataId != null && response.CustCompanyFinDataId != "undefined" && response.CustCompanyFinDataId != "" && response.CustCompanyFinDataId > 0){
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
            }
          }
          if(this.CustCompanyFinDataForm.controls["CustCompanyId"].value == 0){
            this.CustCompanyFinDataForm.patchValue({
              CustPersonalId: custCompanyData.CustCompanyId
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  calculatePersonalFinData() {
    if (this.CustPersonalFinDataForm.valid) {
      var formData = this.CustPersonalFinDataForm.value;
      var monthlyIncomeAmt = formData.MonthlyIncomeAmt == "" ? 0 : parseInt(formData.MonthlyIncomeAmt);
      var spouseMonthlyIncomeAmt = formData.SpouseMonthlyIncomeAmt == "" ? 0 : parseInt(formData.SpouseMonthlyIncomeAmt);
      var totalIncomeAmt = 0;
      var nettIncomeAmt = 0;
      var nettProfitMonthlyAmt = formData.NettProfitMonthlyAmt == "" ? 0 : parseInt(formData.NettProfitMonthlyAmt);
      var otherIncomeAmt = formData.OtherIncomeAmt == "" ? 0 : parseInt(formData.OtherIncomeAmt);
      var monthlyExpenseAmt = formData.MonthlyExpenseAmt == "" ? 0 : parseInt(formData.MonthlyExpenseAmt);
      var monthlyInstallmentAmt = formData.MonthlyInstallmentAmt == "" ? 0 : parseInt(formData.MonthlyInstallmentAmt);
      var otherMonthlyInstAmt = formData.OtherMonthlyInstAmt == "" ? 0 : parseInt(formData.OtherMonthlyInstAmt);
      var totalAmt = 0;

      if(formData.IsJoinIncome){
        totalAmt = monthlyIncomeAmt + spouseMonthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
      }
      else{
        totalAmt = monthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
      }
      var netIncomeAmt = totalAmt - (monthlyExpenseAmt + monthlyInstallmentAmt + otherMonthlyInstAmt);

      this.CustPersonalFinDataForm.patchValue({
        TotalIncomeAmt: totalAmt,
        NettIncomeAmt: netIncomeAmt
      });
      this.isCalculated = true;
      this.spouseMonthlyIncomeAmt = this.CustPersonalFinDataForm.controls["SpouseMonthlyIncomeAmt"].value;
    }
  }

  // getCustFinData() {
  //   var response;
  //   var url;

  //   if (this.MrCustTypeCode == "PERSONAL") {
  //     var tempResponse = this.CustPersonalFinDataForm.value;
  //     if(this.MrMaritalStatCode != "MAR"){
  //       tempResponse.SpouseMonthlyIncomeAmt = 0;
  //     }
  //     else{
  //       if(tempResponse.SpouseMonthlyIncomeAmt = ''){
  //         tempResponse.SpouseMonthlyIncomeAmt = 0;
  //       }
  //     }
  //     response = tempResponse;

  //     if(response.CustPersonalFinDataId > 0){
  //       url = AdInsConstant.EditCustPersonalFinData;
  //     }
  //     else{
  //       url = AdInsConstant.AddCustPersonalFinData
  //     }
  //   }
  //   else if (this.MrCustTypeCode == "COMPANY") {
  //     response = this.CustCompanyFinDataForm.value;

  //     if(response.CustCompanyFinDataId > 0){
  //       url = AdInsConstant.EditCustCompanyFinData;
  //     }
  //     else{
  //       url = AdInsConstant.AddCustCompanyFinData;
  //     }
  //   }

  //   if (this.isCalculated) {
  //     this.httpClient.post(url, response).subscribe(
  //       (response) => {
  //         this.toastr.successMessage(response["Message"]);
  //         this.wizard.goToNextStep();
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  //   else {
  //     this.toastr.errorMessage("Please Calculate First");
  //   }
  // }

  next() {
    var response;
    var url;

    if (this.MrCustTypeCode == "PERSONAL") {
      var tempResponse = this.CustPersonalFinDataForm.value;
      if(this.mrMaritalStatCode != "MAR"){
        tempResponse.SpouseMonthlyIncomeAmt = 0;
      }
      else{
        if(tempResponse.SpouseMonthlyIncomeAmt = ""){
          tempResponse.SpouseMonthlyIncomeAmt = 0;
        }
      }
      response = tempResponse;

      if(response.CustPersonalFinDataId > 0){
        url = AdInsConstant.EditCustPersonalFinData;
      }
      else{
        url = AdInsConstant.AddCustPersonalFinData
      }
    }
    else if (this.MrCustTypeCode == "COMPANY") {
      response = this.CustCompanyFinDataForm.value;

      if(response.CustCompanyFinDataId > 0){
        url = AdInsConstant.EditCustCompanyFinData;
      }
      else{
        url = AdInsConstant.AddCustCompanyFinData;
      }
    }

    if (this.isCalculated) {
      if(response.SpouseMonthlyIncomeAmt == ""){
        response.SpouseMonthlyIncomeAmt = this.spouseMonthlyIncomeAmt;
      }
      console.log(response);
      this.httpClient.post(url, response).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.wizard.goToNextStep();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.toastr.errorMessage("Please Calculate First");
    }
  }
}
