import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { CustPersonalFinDataObj } from 'app/shared/model/CustPersonalFinDataObj.Model';
import { CustCompanyFinDataObj } from 'app/shared/model/CustCompanyFinDataObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { first, map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-cust-fin-data-tab',
  templateUrl: './cust-fin-data-tab.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustFinDataTabComponent implements OnInit {
  @Input() MrCustTypeCode: string;
  @Input() CustId: number;
  @Output() outputTab: EventEmitter<object> = new EventEmitter();

  sourceOfIncomeList: any;
  isCalculated: boolean;
  spouseMonthlyIncomeAmt: number;
  mrMaritalStatCode: string;
  maritalConstant: string = CommonConstant.MR_MARITAL_STAT_CODE_MARRIED;
  Page: string;
  attrGroup: string;
  CustPersonalFinDataForm = this.fb.group({
    CustPersonalFinDataId: [0, [Validators.required]],
    CustPersonalId: [0, [Validators.required]],
    MonthlyIncomeAmt: [''],
    MonthlyExpenseAmt: [''],
    MonthlyInstallmentAmt: [''],
    MrSourceOfIncomeCode: [''],
    SpouseMonthlyIncomeAmt: [''],
    IsJoinIncome: [false],
    TotalIncomeAmt: [0],
    NettIncomeAmt: [0],
    NettProfitMonthlyAmt: [0],
    OtherIncomeAmt: [''],
    OtherMonthlyInstAmt: [0],
    RowVersion: ['']
  });

  CustCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0, [Validators.required]],
    CustCompanyId: [0, [Validators.required]],
    GrossMonthlyIncomeAmt: [''],
    GrossProfitAmt: [''],
    ReturnOfInvestmentPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    ReturnOfEquityPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    ReturnOfAssetPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    ProfitMarginPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    CurrentRatioPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    DebtEquityRatioPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    InvTurnOverPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    ArTurnOverPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    GrowthPrcnt: ['', [Validators.pattern('^[0-9]+$')]],
    WorkingCapitalAmt: [''],
    OthMonthlyInstAmt: [''],
    DateAsOf: [''],
    Revenue: [''],
    OprCost: [''],
    ProfitBeforeTax: [''],
    CurrAsset: [''],
    NetFixedAsset: [''],
    TotalAsset: [''],
    CurrLiablts: [''],
    LongTemrLiablts: [''],
    ShareholderEquity: [''],
    CurrRatio: [''],
    RowVersion: ['']
  });

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      this.isCalculated = false;
    }
    else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
      this.isCalculated = true;
    }
    this.route.queryParams.subscribe(params => {
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });
  }

  async ngOnInit() {
    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyFinData : CommonConstant.AttrGroupCustPersonalFinData;

    var datePipe = new DatePipe("en-US");
    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      var custPersonalData;
      var custPersonal = new CustPersonalObj();
      custPersonal.CustId = this.CustId;
      this.httpClient.post(URLConstant.GetCustPersonalbyCustId, custPersonal).pipe(
        map((response: CustPersonalObj) => {
          if (!response || response.MrMaritalStatCode == null) {
            this.mrMaritalStatCode = CommonConstant.MR_MARITAL_STAT_CODE_SINGLE;
          }
          else {
            this.mrMaritalStatCode = response.MrMaritalStatCode;
          }
          custPersonalData = response;
          return response;
        }),
        mergeMap((response: CustPersonalObj) => {
          var custPersonalFinData = new CustPersonalFinDataObj();
          custPersonalFinData.CustPersonalId = response.CustPersonalId;
          let custFinData = this.httpClient.post(URLConstant.GetCustPersonalFinDataByCustPersonalId, custPersonalFinData);
          var refMasterSourceIncome = new RefMasterObj();
          refMasterSourceIncome.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeSourceIncome;
          let sourceIncomeList = this.httpClient.post(URLConstant.GetListActiveRefMaster, refMasterSourceIncome);
          return forkJoin([custFinData, sourceIncomeList]);
        })
      ).subscribe(
        (response: any) => {
          var custFinData = response[0];
          var sourceIncome = response[1];
          this.CustPersonalFinDataForm.patchValue({
            CustPersonalFinDataId: custFinData.CustPersonalFinDataId,
            CustPersonalId: custPersonalData.CustPersonalId,
            MonthlyIncomeAmt: custFinData.MonthlyIncomeAmt,
            MonthlyExpenseAmt: custFinData.MonthlyExpenseAmt,
            MonthlyInstallmentAmt: custFinData.MonthlyInstallmentAmt,
            MrSourceOfIncomeCode: custFinData.MrSourceOfIncomeCode,
            SpouseMonthlyIncomeAmt: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.SpouseMonthlyIncomeAmt : 0,
            IsJoinIncome: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.IsJoinIncome : false,
            TotalIncomeAmt: this.currencyFormatter(custFinData.TotalIncomeAmt.toString()),
            NettIncomeAmt: this.currencyFormatter(custFinData.NettIncomeAmt.toString()),
            NettProfitMonthlyAmt: custFinData.NettProfitMonthlyAmt,
            OtherIncomeAmt: custFinData.OtherIncomeAmt,
            OtherMonthlyInstAmt: custFinData.OtherMonthlyInstAmt,
            RowVersion: custFinData.RowVersion
          });
          this.sourceOfIncomeList = sourceIncome;
        }
      );

      // this.bindFinancialAttribute();

    }
    else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
      var custCompanyData;
      var custCompany = new CustCompanyObj();
      custCompany.CustId = this.CustId;
      this.httpClient.post(URLConstant.GetCustCompanyByCustId, custCompany).pipe(
        map((response: CustCompanyObj) => {
          custCompanyData = response;
          return response;
        }),
        mergeMap((response: CustCompanyObj) => {
          var custCompanyFinData = new CustCompanyFinDataObj();
          custCompanyFinData.CustCompanyId = response.CustCompanyId;
          return this.httpClient.post(URLConstant.GetCustCompanyFinDataByCustCompanyId, custCompanyFinData);
        })
      ).subscribe(
        (response: any) => {
          this.isCalculated = true;
          this.CustCompanyFinDataForm.patchValue({
            CustCompanyFinDataId: response.CustCompanyFinDataId,
            CustCompanyId: custCompanyData.CustCompanyId,
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
            DateAsOf: datePipe.transform(response.DateAsOf, 'yyyy-MM-dd'),
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
      );

      //  this.bindFinancialAttribute();

    }
  }

  calculatePersonalFinData() {
    if (this.CustPersonalFinDataForm.valid) {
      var formData = this.CustPersonalFinDataForm.value;
      var monthlyIncomeAmt = formData.MonthlyIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyIncomeAmt.toString()));
      var spouseMonthlyIncomeAmt = formData.SpouseMonthlyIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.SpouseMonthlyIncomeAmt.toString()));
      var totalIncomeAmt = 0;
      var nettIncomeAmt = 0;
      var nettProfitMonthlyAmt = formData.NettProfitMonthlyAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.NettProfitMonthlyAmt.toString()));
      var otherIncomeAmt = formData.OtherIncomeAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.OtherIncomeAmt.toString()));
      var monthlyExpenseAmt = formData.MonthlyExpenseAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyExpenseAmt.toString()));
      var monthlyInstallmentAmt = formData.MonthlyInstallmentAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.MonthlyInstallmentAmt.toString()));
      var otherMonthlyInstAmt = formData.OtherMonthlyInstAmt == "" ? 0 : parseInt(this.currencyToNumber(formData.OtherMonthlyInstAmt.toString()));
      var totalAmt = 0;

      if (formData.IsJoinIncome) {
        totalAmt = monthlyIncomeAmt + spouseMonthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
      }
      else {
        totalAmt = monthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
      }
      var netIncomeAmt = totalAmt - (monthlyExpenseAmt + monthlyInstallmentAmt + otherMonthlyInstAmt);

      this.CustPersonalFinDataForm.patchValue({
        TotalIncomeAmt: this.currencyFormatter(totalAmt.toString()),
        NettIncomeAmt: this.currencyFormatter(netIncomeAmt.toString())
      });
      this.isCalculated = true;
      this.spouseMonthlyIncomeAmt = this.CustPersonalFinDataForm.controls["SpouseMonthlyIncomeAmt"].value;
    }
  }

  currencyFormatter(value: string) {
    return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  currencyToNumber(value: string) {
    return value.replace(/,/g, "");
  }

  // back(){
  //   this.outputTab.emit({ stepMode: "previous"});
  // }

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
  //         this.outputTab.emit({ stepMode: "next"});
  //       }
  //     );
  //   }
  //   else {
  //     this.toastr.errorMessage("Please Calculate First");
  //   }
  // }

  next() {
    console.log("ameng");
    var response;
    var url;

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      var tempResponse = this.CustPersonalFinDataForm.value;
      if (this.mrMaritalStatCode != CommonConstant.MR_MARITAL_STAT_CODE_MARRIED) {
        tempResponse.SpouseMonthlyIncomeAmt = 0;
      }
      else {
        if (tempResponse.SpouseMonthlyIncomeAmt = "") {
          tempResponse.SpouseMonthlyIncomeAmt = 0;
        }
      }
      response = tempResponse;
      response.MonthlyIncomeAmt = this.currencyToNumber(response.MonthlyIncomeAmt.toString());
      response.MonthlyExpenseAmt = this.currencyToNumber(response.MonthlyExpenseAmt.toString());
      response.MonthlyInstallmentAmt = this.currencyToNumber(response.MonthlyInstallmentAmt.toString());
      response.SpouseMonthlyIncomeAmt = this.currencyToNumber(response.SpouseMonthlyIncomeAmt.toString());
      response.TotalIncomeAmt = this.currencyToNumber(response.TotalIncomeAmt.toString());
      response.NettIncomeAmt = this.currencyToNumber(response.NettIncomeAmt.toString());
      response.NettProfitMonthlyAmt = this.currencyToNumber(response.NettProfitMonthlyAmt.toString());
      response.OtherIncomeAmt = this.currencyToNumber(response.OtherIncomeAmt.toString());
      response.OtherMonthlyInstAmt = this.currencyToNumber(response.OtherMonthlyInstAmt.toString());

      if (response.CustPersonalFinDataId > 0) {
        url = URLConstant.EditCustPersonalFinData;
      }
      else {
        url = URLConstant.AddCustPersonalFinData
      }
    }
    else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
      response = this.CustCompanyFinDataForm.value;
      response.GrossMonthlyIncomeAmt = this.currencyToNumber(response.GrossMonthlyIncomeAmt.toString());
      response.GrossProfitAmt = this.currencyToNumber(response.GrossProfitAmt.toString());
      response.WorkingCapitalAmt = this.currencyToNumber(response.WorkingCapitalAmt.toString());
      response.OthMonthlyInstAmt = this.currencyToNumber(response.OthMonthlyInstAmt.toString());
      response.Revenue = this.currencyToNumber(response.Revenue.toString());
      response.OprCost = this.currencyToNumber(response.OprCost.toString());
      response.ProfitBeforeTax = this.currencyToNumber(response.ProfitBeforeTax.toString());
      response.CurrAsset = this.currencyToNumber(response.CurrAsset.toString());
      response.NetFixedAsset = this.currencyToNumber(response.NetFixedAsset.toString());
      response.TotalAsset = this.currencyToNumber(response.TotalAsset.toString());
      response.CurrLiablts = this.currencyToNumber(response.CurrLiablts.toString());
      response.LongTemrLiablts = this.currencyToNumber(response.LongTemrLiablts.toString());
      response.ShareholderEquity = this.currencyToNumber(response.ShareholderEquity.toString());

      if (response.CustCompanyFinDataId > 0) {
        url = URLConstant.EditCustCompanyFinData;
      }
      else {
        url = URLConstant.AddCustCompanyFinData;
      }
    }

    if (this.isCalculated) {
      var custAttrRequest = new Array<Object>();
      if (response.SpouseMonthlyIncomeAmt == "") {
        response.SpouseMonthlyIncomeAmt = this.spouseMonthlyIncomeAmt;
      }
      if (this.CustPersonalFinDataForm.get('AttrList') != undefined || this.CustCompanyFinDataForm.get('AttrList') != undefined) {
        if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
          var formValue = this.CustCompanyFinDataForm['controls']['AttrList'].value;
        } else {
          var formValue = this.CustPersonalFinDataForm['controls']['AttrList'].value;
        }
        var urlAttr = URLConstant.AddEditListCustAttrContent;
        if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
          for (const key in formValue) {
            if (formValue[key]["AttrValue"] != null) {
              var custAttr = {
                CustId: this.CustId,
                RefAttrId: formValue[key]["RefAttrId"],
                AttrValue: formValue[key]["AttrValue"],
                AttrGroup: this.attrGroup
              };
              custAttrRequest.push(custAttr);
            }
          }
        }
      }
      else{
        custAttrRequest.push({
          CustId: 0,
          RefAttrId: 0,
          AttrValue: "",
          AttrGroup: ""
        });
      }
      var CustFinDataCustomObj = {
        CustAttrContentObjs: custAttrRequest,
        CustFinDataObj: response
      }
      this.httpClient.post(url, CustFinDataCustomObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.outputTab.emit({ stepMode: "next" });
        }
      );
    }
    else {
      this.toastr.warningMessage("Please Calculate First");
    }
  }
}