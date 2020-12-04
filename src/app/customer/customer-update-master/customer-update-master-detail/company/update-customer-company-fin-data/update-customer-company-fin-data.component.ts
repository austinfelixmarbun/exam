import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
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
  MainCustBankAcc: Array<any>;
  AppCustBankAcc: Array<any>;
  ArrayNum: Array<number>;
  num: number;
  IsCopyAll: boolean;
  CustBankAccToDelete: Array<number>;

  CustomerCompanyFinDataForm = this.fb.group({
    CustCompanyFinDataId: [0],
    CustCompanyId: [0],
    GrossMonthlyIncomeAmt: [0, [Validators.required]],
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
    this.MainCustBankAcc = new Array<any>();
    this.AppCustBankAcc = new Array<any>();
    this.ArrayNum = new Array<number>();
    this.IsCopyAll = false;
    this.CustBankAccToDelete = new Array<number>();
  }

  ngOnInit() {
    var datePipe = new DatePipe("en-US");
    this.http.post(URLConstant.GetFinDataForUpdateMasterCustCompanyFinData, { CustDataTrxId: this.CustDataTrxId }).toPromise().then(
      (response) => {
        response["AppCompanyFinData"]["DateAsOf"] = datePipe.transform(response["AppCompanyFinData"]["DateAsOf"], "yyyy-MM-dd");
        response["MasterCompanyFinData"]["DateAsOf"] = datePipe.transform(response["MasterCompanyFinData"]["DateAsOf"], "yyyy-MM-dd");
        this.AppCompanyFinData = response["AppCompanyFinData"];
        this.CustomerCompanyFinDataForm.patchValue({...response["MasterCompanyFinData"]});

        this.MainCustBankAcc = response[0]["MasterCustFinData"]["CustBankAccList"];
        this.AppCustBankAcc = response[0]["AppCustFinData"]["CustBankAccList"];
        for (const item of this.MainCustBankAcc) {
          item["IsMasterData"] = true;
          item["IsMasterStmnt"] = true;
        }
        for (const item of this.AppCustBankAcc) {
          var isMasterData = false;
          var isMasterStmnt = false;
          var isAddedBankAcc = false;
          var isAddedBankStmnt = false;
          for (const main of this.MainCustBankAcc) {
            if(item["RefBankId"] == main["RefBankId"] &&
                item["BankAccNo"] == main["BankAccNo"] && 
                item["BankAccName"] == main["BankAccName"]){
                isMasterData = true;

                if(item["CustBankStmntList"].length == main["CustBankStmntList"].length){
                  for (let i = 0; i < item["CustBankStmntList"].length; i++) {
                    for (const key in item["CustBankStmntList"][i]) {
                      if(item["CustBankStmntList"][key] == main["CustBankStmntList"][key]){
                        isMasterStmnt = true;
                      }
                      else{
                        isMasterData = false;
                        isMasterStmnt = false;
                        break;
                      }
                    } 
                  }
                }
                break;
            }
          }
          item["IsMasterData"] = isMasterData;
          item["IsMasterStmnt"] = isMasterStmnt;
          item["IsAddedBankAcc"] = isAddedBankAcc;
          item["IsAddedBankStmnt"] = isAddedBankStmnt;
        }
        if(this.MainCustBankAcc.length > this.AppCustBankAcc.length){
          this.num = this.MainCustBankAcc.length;
          for (let i = 0; i < this.MainCustBankAcc.length - this.AppCustBankAcc.length; i++) {
            this.AppCustBankAcc.push(new Object());
          }
        }
        else if(this.MainCustBankAcc.length < this.AppCustBankAcc.length){
          this.num = this.AppCustBankAcc.length;
          for (let i = 0; i < this.AppCustBankAcc.length - this.MainCustBankAcc.length; i++) {
            this.MainCustBankAcc.push(new Object());
          }
        }
        else{
          this.num = this.MainCustBankAcc.length;
        }
        this.ArrayNum = new Array<number>(this.num).fill(1);
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
        // if(this.AppCompanyFinData[key]){
          obj[key] = this.AppCompanyFinData[key];
        // }
      }
    }
    this.CustomerCompanyFinDataForm.patchValue(obj);
    this.MainCustBankAcc = new Array<any>();
    for (let i = 0; i < this.AppCustBankAcc.length; i++) {
      this.AddNewBankAcc(i);
    }
    this.IsCopyAll = true;
  }

  CopyHandler(formControlName){
    var obj = new Object();
    obj[formControlName] = this.AppCompanyFinData[formControlName];
    this.CustomerCompanyFinDataForm.patchValue(obj);
  }

  AddNewBankAcc(idx){
    this.AppCustBankAcc[idx]["IsAddedBankAcc"] = true;
    this.AppCustBankAcc[idx]["IsAddedBankStmnt"] = true;
    var idxToDelete = 0;
    for (var i = 0; i < this.MainCustBankAcc.length; i++) {
      if(this.MainCustBankAcc[i]["RefBankId"] == this.AppCustBankAcc[idx]["RefBankId"] &&
          this.MainCustBankAcc[i]["BankName"] == this.AppCustBankAcc[idx]["BankName"] &&
          this.MainCustBankAcc[i]["BankBranch"] == this.AppCustBankAcc[idx]["BankBranch"] &&
          this.MainCustBankAcc[i]["BankAccNo"] == this.AppCustBankAcc[idx]["BankAccNo"] &&
          this.MainCustBankAcc[i]["BankAccName"] == this.AppCustBankAcc[idx]["BankAccName"]){
        this.CustBankAccToDelete.push(this.MainCustBankAcc[i]["CustBankAccId"]);
        idxToDelete = i;
        break;
      }
    }
    this.MainCustBankAcc.splice(idxToDelete, 1);
    var obj = new Object();
    obj["RefBankId"] = this.AppCustBankAcc[idx]["RefBankId"];
    obj["BankName"] = this.AppCustBankAcc[idx]["BankName"];
    obj["BankBranch"] = this.AppCustBankAcc[idx]["BankBranch"];
    obj["BankAccNo"] = this.AppCustBankAcc[idx]["BankAccNo"];
    obj["BankAccName"] = this.AppCustBankAcc[idx]["BankAccName"];
    obj["IsDefault"] = this.AppCustBankAcc[idx]["IsDefault"];
    obj["CustBankStmntList"] = this.AppCustBankAcc[idx]["CustBankStmntList"];
    obj["IsMasterData"] = this.AppCustBankAcc[idx]["IsMasterData"];
    obj["IsMasterStmnt"] = this.AppCustBankAcc[idx]["IsMasterStmnt"];
    obj["IsAddedBankAcc"] = this.AppCustBankAcc[idx]["IsAddedBankAcc"];
    obj["IsAddedBankStmnt"] = this.AppCustBankAcc[idx]["IsAddedBankStmnt"];
    this.MainCustBankAcc.push(obj);
  }

  back(){
    // this.router.navigate(["/Customer/UpdateDataCustomer/Paging"]);
    AdInsHelper.RedirectUrl(this.router, ["/Customer/UpdateDataCustomer/Paging"], {});
  }

  SaveValue(){
    var formValue = this.CustomerCompanyFinDataForm.value;
    var requestBankAcc = new Array<any>();
    for (const item of this.MainCustBankAcc) {
      if(!item["IsMasterData"]){
        requestBankAcc.push(item);
      }
    }
    formValue["CustBankAccList"] = requestBankAcc;
    formValue["IsCopyAll"] = this.IsCopyAll;
    formValue["CustBankAccIdToDelete"] = this.CustBankAccToDelete;
    this.http.post(URLConstant.EditMasterCustCompanyFinData, formValue).toPromise().then(
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
