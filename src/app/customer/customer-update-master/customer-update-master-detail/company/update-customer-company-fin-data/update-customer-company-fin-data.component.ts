import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UpdateCustCompanyFinDataObj } from 'app/shared/model/UpdateMasterCust/UpdateCustCompanyFinDataObj.Model';

@Component({
  selector: 'app-update-customer-company-fin-data',
  templateUrl: './update-customer-company-fin-data.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class UpdateCustomerCompanyFinDataComponent implements OnInit {
  @Input() CustDataTrxId: number;
  @Output() ResponseTab: EventEmitter<any>;
  AppCompanyFinData: UpdateCustCompanyFinDataObj;

  CustomerCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0],
    CustCompanyId: [0],
    GrossMonthlyIncomeAmt: [0],
    GrossProfitAmt: [0],
    ReturnOfInvestmentPrcnt: [0],
    ReturnOfEquityPrcnt: [0],
    ReturnOfAssetPrcnt: [0],
    ProfitMarginPrcnt: [0],
    CurrentRatioPrcnt: [0],
    DebtEquityRatioPrcnt: [0],
    InvTurnOverPrcnt: [0],
    ArTurnOverPrcnt: [0],
    GrowthPrcnt: [0],
    WorkingCapitalAmt: [0],
    OthMonthlyInstAmt: [0],
    DateAsOf: [''],
    Revenue: [0],
    OprCost: [0],
    ProfitBeforeTax: [0],
    CurrAsset: [0],
    NetFixedAsset: [0],
    TotalAsset: [0],
    CurrLiablts: [0],
    LongTemrLiablts: [0],
    ShareholderEquity: [0],
    CurrRatio: [0],
    RowVersion: ['']
  });
  
  constructor(
    private http: HttpClient, 
    private toastr: NGXToastrService, 
    private fb: FormBuilder,
    private router: Router
  ) { 
    this.ResponseTab = new EventEmitter<any>();
  }

  ngOnInit() {
    this.http.post(URLConstant.GetFinDataForUpdateMasterCustCompanyFinData, { CustDataTrxId: this.CustDataTrxId }).toPromise().then(
      (response) => {
        this.AppCompanyFinData = response["AppCompanyFinData"];
        this.CustomerCompanyFinDataForm.patchValue({...response["MasterCompanyFinData"]});
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  CopyAllHandler(){
    var obj = new Object();
    for (const key in this.AppCompanyFinData) {
      if(key == "CustCompanyFinDataId" || key == "CustCompanyId" || key == "RowVersion"){
        continue;
      }
      else{
        if(this.AppCompanyFinData[key]){
          obj[key] = this.AppCompanyFinData[key];
        }
      }
    }
    this.CustomerCompanyFinDataForm.patchValue(obj);
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCompanyFinData[formControlName];
    this.CustomerCompanyFinDataForm.patchValue(obj);
  }

  back(){
    this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
  }

  SaveValue(){
    this.http.post(URLConstant.EditMasterCustCompanyFinData, this.CustomerCompanyFinDataForm.value).toPromise().then(
      (response) => {
        this.ResponseTab.emit(response);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

}
