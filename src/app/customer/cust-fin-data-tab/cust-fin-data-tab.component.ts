import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CustPersonalFinDataObj } from 'app/shared/model/CustPersonalFinDataObj.Model';
import { CustCompanyFinDataObj } from 'app/shared/model/CustCompanyFinDataObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate, } from '@angular/common';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

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
  @ViewChild('ModalPersonalFinData') ModalPersonalFinData;
  @ViewChild('ModalCoyFinData') ModalCoyFinData;

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
    MonthlyIncomeAmt: ['', Validators.required],
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
    DateAsOf: [''],
    RowVersion: ['']
  });

  CustCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0, [Validators.required]],
    CustCompanyId: [0, [Validators.required]],
    GrossMonthlyIncomeAmt: [''],
    GrossProfitAmt: [''],
    ReturnOfInvestmentPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    ReturnOfEquityPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    ReturnOfAssetPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    ProfitMarginPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    CurrentRatioPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    DebtEquityRatioPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    InvTurnOverPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    ArTurnOverPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
    GrowthPrcnt: [0, [Validators.pattern('^[0-9]+$')]],
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

  CustAttrListForm = this.fb.group({
  });

  IsAddFinData: boolean = true;
  ListCustPersonalFinData : Array<CustPersonalFinDataObj> = [];
  ListCustCoyFinData : Array<CustCompanyFinDataObj> = [];  
  custPersonalId: number;
  custCoyId: number;
  currentCustFinDataIndex: number;
  currentModal: any;

  BusinessDt: Date;

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal) {
    this.route.queryParams.subscribe(params => {
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });
  }

  async ngOnInit() {
    var currentUserContext = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    if (currentUserContext != null && currentUserContext != undefined)
    {
      this.BusinessDt = new Date(currentUserContext[CommonConstant.BUSINESS_DT]);
      this.BusinessDt.setDate(this.BusinessDt.getDate() - 1);
    }

    this.attrGroup = this.MrCustTypeCode == CommonConstant.CustTypeCompany ? CommonConstant.AttrGroupCustCompanyFinData : CommonConstant.AttrGroupCustPersonalFinData;
    
    this.initRefMaster();

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      await this.getListCustPersonalFinData();
    }
    else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
      await this.getListCustCoyFinData();
    }
  }

  initRefMaster()
  {
    this.httpClient.post(URLConstant.GetListActiveRefMaster, {'RefMasterTypeCode': CommonConstant.RefMasterTypeCodeSourceIncome}).subscribe((response) => {
      this.sourceOfIncomeList = response;
    })
  }

  async getListCustPersonalFinData()
  {
    this.ListCustPersonalFinData = [];
    if(!this.custPersonalId)
    {
      await this.httpClient.post(URLConstant.GetCustPersonalbyCustId, {'CustId': this.CustId}).toPromise().then((response:CustPersonalObj) => {
        this.custPersonalId = response.CustPersonalId;
        this.mrMaritalStatCode = (!response || response.MrMaritalStatCode == null) ? CommonConstant.MR_MARITAL_STAT_CODE_SINGLE : response.MrMaritalStatCode;
      })
    }    

    await this.httpClient.post(URLConstant.GetListCustPersonalFinDataByCustId,  {'CustId': this.CustId}).toPromise().then((response) => {
      this.ListCustPersonalFinData = response['ListCustPersonalFinData'];
    })
    
  }

  async getListCustCoyFinData()
  {
    this.ListCustCoyFinData = [];
    if(!this.custCoyId)
    {
      await this.httpClient.post(URLConstant.GetCustCompanyByCustId, {'CustId': this.CustId}).toPromise().then((response:CustCompanyObj) => {
        this.custCoyId = response.CustCompanyId;
      })
    }    

    await this.httpClient.post(URLConstant.GetListCustCompanyFinDataByCustId,  {'CustId': this.CustId}).toPromise().then((response) => {
      this.ListCustCoyFinData = response['ListCustCompanyFinData'];
    })
    
  }

  showModalCustFinData(FinDataIndex:number)
  {
    this.isCalculated = false;
    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
      this.getSingleCustPersonalFinData(FinDataIndex);
      this.currentModal = this.modalService.open(this.ModalPersonalFinData, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false});
    }
    else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
      this.getSingleCustCoyFinData(FinDataIndex);
      this.currentModal = this.modalService.open(this.ModalCoyFinData, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false});
    }
  }

  async deleteModalCustFinData(FinDataIndex: number)
  {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      if (this.MrCustTypeCode == CommonConstant.CustTypePersonal) {
        var CustPersonalFinDataCustomObj = {
          CustFinDataObj: this.ListCustPersonalFinData[FinDataIndex]
        }
        await this.httpClient.post(URLConstant.DeleteCustPersonalFinData, CustPersonalFinDataCustomObj).toPromise().then(
          (response) => {
            this.ListCustPersonalFinData.splice(FinDataIndex, 1);
          }
        );
      }
      else if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
        var CustCoyFinDataCustomObj = {
          CustFinDataObj: this.ListCustCoyFinData[FinDataIndex]
        }
        await this.httpClient.post(URLConstant.DeleteCustCompanyFinData, CustCoyFinDataCustomObj).toPromise().then(
          (response) => {
            this.ListCustCoyFinData.splice(FinDataIndex, 1);
          }
        );
      }
    }
  }

  getSingleCustPersonalFinData(currentCustFinDataIndex:number)
  {
    this.IsAddFinData = false;
    this.currentCustFinDataIndex = currentCustFinDataIndex;
    let custFinData:CustPersonalFinDataObj = this.ListCustPersonalFinData[this.currentCustFinDataIndex];
    let datePipe = new DatePipe("en-US");
    if(!custFinData) 
    {
      custFinData = new CustPersonalFinDataObj();
      this.IsAddFinData = true;
    }
    this.CustPersonalFinDataForm.patchValue({
      CustPersonalFinDataId: custFinData.CustPersonalFinDataId,
      CustPersonalId: this.custPersonalId,
      MonthlyIncomeAmt: custFinData.MonthlyIncomeAmt,
      MonthlyExpenseAmt: custFinData.MonthlyExpenseAmt,
      MonthlyInstallmentAmt: custFinData.MonthlyInstallmentAmt,
      MrSourceOfIncomeCode: custFinData.MrSourceOfIncomeCode,
      SpouseMonthlyIncomeAmt: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.SpouseMonthlyIncomeAmt : 0,
      IsJoinIncome: this.mrMaritalStatCode == CommonConstant.MR_MARITAL_STAT_CODE_MARRIED ? custFinData.IsJoinIncome : false,
      TotalIncomeAmt: custFinData.TotalIncomeAmt,
      NettIncomeAmt: custFinData.NettIncomeAmt,
      NettProfitMonthlyAmt: custFinData.NettProfitMonthlyAmt,
      OtherIncomeAmt: custFinData.OtherIncomeAmt,
      OtherMonthlyInstAmt: custFinData.OtherMonthlyInstAmt,
      DateAsOf: custFinData.DateAsOf ? datePipe.transform(custFinData.DateAsOf, 'yyyy-MM-dd') : '',
      RowVersion: custFinData.RowVersion
    });

    if(this.IsAddFinData) this.CustPersonalFinDataForm.controls['DateAsOf'].setValidators([Validators.required]);
    else this.CustPersonalFinDataForm.controls['DateAsOf'].clearValidators();
    this.CustPersonalFinDataForm.controls['DateAsOf'].updateValueAndValidity();
  }

  getSingleCustCoyFinData(currentCustFinDataIndex:number)
  {
    this.IsAddFinData = false;
    this.currentCustFinDataIndex = currentCustFinDataIndex;
    let custFinData:CustCompanyFinDataObj = this.ListCustCoyFinData[this.currentCustFinDataIndex];
    let datePipe = new DatePipe("en-US");
    if(!custFinData)  
    {
      custFinData = new CustCompanyFinDataObj();
      this.IsAddFinData = true;
    }
    this.CustCompanyFinDataForm.patchValue({
      CustCompanyFinDataId: custFinData.CustCompanyFinDataId,
      CustCompanyId: this.custCoyId,
      GrossMonthlyIncomeAmt: custFinData.GrossMonthlyIncomeAmt,
      GrossProfitAmt: custFinData.GrossProfitAmt,
      ReturnOfInvestmentPrcnt: custFinData.ReturnOfInvestmentPrcnt,
      ReturnOfEquityPrcnt: custFinData.ReturnOfEquityPrcnt,
      ReturnOfAssetPrcnt: custFinData.ReturnOfAssetPrcnt,
      ProfitMarginPrcnt: custFinData.ProfitMarginPrcnt,
      CurrentRatioPrcnt: custFinData.CurrentRatioPrcnt,
      DebtEquityRatioPrcnt: custFinData.DebtEquityRatioPrcnt,
      InvTurnOverPrcnt: custFinData.InvTurnOverPrcnt,
      ArTurnOverPrcnt: custFinData.ArTurnOverPrcnt,
      GrowthPrcnt: custFinData.GrowthPrcnt,
      WorkingCapitalAmt: custFinData.WorkingCapitalAmt,
      OthMonthlyInstAmt: custFinData.OthMonthlyInstAmt,
      DateAsOf: custFinData.DateAsOf ? datePipe.transform(custFinData.DateAsOf, 'yyyy-MM-dd') : '',
      Revenue: custFinData.Revenue,
      OprCost: custFinData.OprCost,
      ProfitBeforeTax: custFinData.ProfitBeforeTax,
      CurrAsset: custFinData.CurrAsset,
      NetFixedAsset: custFinData.NetFixedAsset,
      TotalAsset: custFinData.TotalAsset,
      CurrLiablts: custFinData.CurrLiablts,
      LongTemrLiablts: custFinData.LongTemrLiablts,
      ShareholderEquity: custFinData.ShareholderEquity,
      CurrRatio: custFinData.CurrRatio,
      RowVersion: custFinData.RowVersion,
    });

    if(this.IsAddFinData) this.CustCompanyFinDataForm.controls['DateAsOf'].setValidators([Validators.required]);
    else this.CustCompanyFinDataForm.controls['DateAsOf'].clearValidators();
    this.CustCompanyFinDataForm.controls['DateAsOf'].updateValueAndValidity();
  }

  onChangeCustFinInput()
  {
    this.isCalculated = false;
  }

  calculatePersonalFinData() {
    Object.keys(this.CustPersonalFinDataForm.controls).forEach(key => {
      this.CustPersonalFinDataForm.get(key).markAsTouched();
    });
    if (this.CustPersonalFinDataForm.valid) {
      var monthlyIncomeAmt = parseInt(this.CustPersonalFinDataForm.controls['MonthlyIncomeAmt'].value);
      var spouseMonthlyIncomeAmt = parseInt(this.CustPersonalFinDataForm.controls['SpouseMonthlyIncomeAmt'].value);
      var totalIncomeAmt = 0;
      var nettIncomeAmt = 0;
      var nettProfitMonthlyAmt = parseInt(this.CustPersonalFinDataForm.controls['NettProfitMonthlyAmt'].value);
      var otherIncomeAmt = parseInt(this.CustPersonalFinDataForm.controls['OtherIncomeAmt'].value);
      var monthlyExpenseAmt = parseInt(this.CustPersonalFinDataForm.controls['MonthlyExpenseAmt'].value);
      var monthlyInstallmentAmt = parseInt(this.CustPersonalFinDataForm.controls['MonthlyInstallmentAmt'].value);
      var otherMonthlyInstAmt = parseInt(this.CustPersonalFinDataForm.controls['OtherMonthlyInstAmt'].value);
      var totalAmt = 0;

      if (this.CustPersonalFinDataForm.controls['IsJoinIncome'].value) {
        totalAmt = monthlyIncomeAmt + spouseMonthlyIncomeAmt + totalIncomeAmt + nettIncomeAmt + nettProfitMonthlyAmt + otherIncomeAmt;
      }
      else {
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

  async saveCustPersonalFinData()
  {
    if (!this.CustPersonalFinDataForm.valid) return;

    if(!this.isCalculated) 
    {
      this.toastr.warningMessage("Please Calculate First");
      return;
    }

    let custFinData:CustPersonalFinDataObj = {
      CustPersonalFinDataId: this.CustPersonalFinDataForm.controls['CustPersonalFinDataId'].value,
      CustPersonalId: this.CustPersonalFinDataForm.controls['CustPersonalId'].value,
      DateAsOf: this.CustPersonalFinDataForm.controls['DateAsOf'].value,
      MonthlyIncomeAmt: this.CustPersonalFinDataForm.controls['MonthlyIncomeAmt'].value,
      MonthlyExpenseAmt: this.CustPersonalFinDataForm.controls['MonthlyExpenseAmt'].value,
      MonthlyInstallmentAmt: this.CustPersonalFinDataForm.controls['MonthlyInstallmentAmt'].value,
      MrSourceOfIncomeCode: this.CustPersonalFinDataForm.controls['MrSourceOfIncomeCode'].value,
      SpouseMonthlyIncomeAmt: this.CustPersonalFinDataForm.controls['SpouseMonthlyIncomeAmt'].value,
      IsJoinIncome: this.CustPersonalFinDataForm.controls['IsJoinIncome'].value,
      TotalIncomeAmt: this.CustPersonalFinDataForm.controls['TotalIncomeAmt'].value,
      NettIncomeAmt: this.CustPersonalFinDataForm.controls['NettIncomeAmt'].value,
      NettProfitMonthlyAmt: this.CustPersonalFinDataForm.controls['NettProfitMonthlyAmt'].value,
      OtherIncomeAmt: this.CustPersonalFinDataForm.controls['OtherIncomeAmt'].value,
      OtherMonthlyInstAmt: this.CustPersonalFinDataForm.controls['OtherMonthlyInstAmt'].value,
      RowVersion: this.CustPersonalFinDataForm.controls['RowVersion'].value,
    };

    var url = this.IsAddFinData ? URLConstant.AddCustPersonalFinData : URLConstant.EditCustPersonalFinData
    var CustFinDataCustomObj = {
      CustFinDataObj: custFinData
    }
    
    await this.httpClient.post(url, CustFinDataCustomObj).toPromise().then(
      (response) => {
        if(this.currentModal) this.currentModal.close();
      }
    );

    await this.getListCustPersonalFinData();
  }

  async saveCustCoyFinData()
  {
    if (!this.CustCompanyFinDataForm.valid) return;

    let custFinData:CustCompanyFinDataObj = {
      CustCompanyFinDataId: this.CustCompanyFinDataForm.controls['CustCompanyFinDataId'].value,
      CustCompanyId: this.CustCompanyFinDataForm.controls['CustCompanyId'].value,
      GrossMonthlyIncomeAmt: this.CustCompanyFinDataForm.controls['GrossMonthlyIncomeAmt'].value,
      GrossProfitAmt: this.CustCompanyFinDataForm.controls['GrossProfitAmt'].value,
      ReturnOfInvestmentPrcnt: this.CustCompanyFinDataForm.controls['ReturnOfInvestmentPrcnt'].value,
      ReturnOfEquityPrcnt: this.CustCompanyFinDataForm.controls['ReturnOfEquityPrcnt'].value,
      ReturnOfAssetPrcnt: this.CustCompanyFinDataForm.controls['ReturnOfAssetPrcnt'].value,
      ProfitMarginPrcnt: this.CustCompanyFinDataForm.controls['ProfitMarginPrcnt'].value,
      CurrentRatioPrcnt: this.CustCompanyFinDataForm.controls['CurrentRatioPrcnt'].value,
      DebtEquityRatioPrcnt: this.CustCompanyFinDataForm.controls['DebtEquityRatioPrcnt'].value,
      InvTurnOverPrcnt: this.CustCompanyFinDataForm.controls['InvTurnOverPrcnt'].value,
      ArTurnOverPrcnt: this.CustCompanyFinDataForm.controls['ArTurnOverPrcnt'].value,
      GrowthPrcnt: this.CustCompanyFinDataForm.controls['GrowthPrcnt'].value,
      WorkingCapitalAmt: this.CustCompanyFinDataForm.controls['WorkingCapitalAmt'].value,
      OthMonthlyInstAmt: this.CustCompanyFinDataForm.controls['OthMonthlyInstAmt'].value,
      DateAsOf: this.CustCompanyFinDataForm.controls['DateAsOf'].value,
      Revenue: this.CustCompanyFinDataForm.controls['Revenue'].value,
      OprCost: this.CustCompanyFinDataForm.controls['OprCost'].value,
      ProfitBeforeTax: this.CustCompanyFinDataForm.controls['ProfitBeforeTax'].value,
      CurrAsset: this.CustCompanyFinDataForm.controls['CurrAsset'].value,
      NetFixedAsset: this.CustCompanyFinDataForm.controls['NetFixedAsset'].value,
      TotalAsset: this.CustCompanyFinDataForm.controls['TotalAsset'].value,
      CurrLiablts: this.CustCompanyFinDataForm.controls['CurrLiablts'].value,
      LongTemrLiablts: this.CustCompanyFinDataForm.controls['LongTemrLiablts'].value,
      ShareholderEquity: this.CustCompanyFinDataForm.controls['ShareholderEquity'].value,
      CurrRatio: this.CustCompanyFinDataForm.controls['CurrRatio'].value,
      RowVersion: this.CustCompanyFinDataForm.controls['RowVersion'].value,
    };

    var url = this.IsAddFinData ? URLConstant.AddCustCompanyFinData : URLConstant.EditCustCompanyFinData
    var CustFinDataCustomObj = {
      CustFinDataObj: custFinData
    }
    
    await this.httpClient.post(url, CustFinDataCustomObj).toPromise().then(
      (response) => {
        if(this.currentModal) this.currentModal.close();
      }
    );

    await this.getListCustCoyFinData();
  }

  saveCustAttrContentAndNext() {
    if (!this.CustAttrListForm.get('AttrList')) return;

    if(!this.ListCustPersonalFinData.length && !this.ListCustCoyFinData.length)
    {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_INPUT_FIN_DATA);
      return;
    }

    var custAttrRequest = new Array<Object>();
    var formValue = this.CustAttrListForm['controls']['AttrList'].value;

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
 
    var CustFinDataCustomObj = {
      CustAttrContentObjs: custAttrRequest,
    }
    this.httpClient.post(URLConstant.AddEditListCustAttrContent, CustFinDataCustomObj).subscribe(
      (response) => {
        this.toastr.successMessage(response["Message"]);
        this.outputTab.emit({ stepMode: "next" });
      }
    );
  }
}