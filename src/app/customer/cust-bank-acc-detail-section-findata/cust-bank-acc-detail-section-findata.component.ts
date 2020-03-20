import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustBankAccObj } from 'app/shared/model/CustBankAccObj.Model';
import { CustBankStmntDObj } from 'app/shared/model/CustBankStmntDObj.Model';
import { CustBankStmntHObj } from 'app/shared/model/CustBankStmntHObj.Model';

@Component({
  selector: 'app-cust-bank-acc-detail-section-findata',
  templateUrl: './cust-bank-acc-detail-section-findata.component.html',
  styleUrls: ['./cust-bank-acc-detail-section-findata.component.scss'],
  providers: [NGXToastrService]
})
export class CustBankAccDetailSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  @Input() pageType: string;
  monthOfYear: Array<string>;
  monthOfYearInclude: Array<number>;
  monthOfYearExclude: Array<number>;
  rowCustBankStmnt: number;
  inputLookupBank: InputLookupObj;
  maxYear: number;

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
    this.monthOfYearInclude = Array.from(Array(12).keys());
    this.monthOfYearExclude = new Array(12);
    this.rowCustBankStmnt = 0;
    this.maxYear = moment().year();
  }

  ngOnInit() {
    this.inputLookupBank = new InputLookupObj();
    this.inputLookupBank.urlJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.inputLookupBank.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupBank.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupBank.pagingJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.inputLookupBank.genericJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    var criteriaList = new Array();
    var criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'IS_ACTIVE';
    criteriaObj.value = "1";
    criteriaList.push(criteriaObj);
    this.inputLookupBank.addCritInput = criteriaList;

    this.CustBankAccForm.patchValue({
      CustId: this.CustId
    });
  }

  addRowCustBankStmnt(){
    if(this.rowCustBankStmnt == 12){
      return false;
    }

    var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    var formGroup = this.fb.group({
      Month: ['', [Validators.required]],
      Year: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.max(this.maxYear)]],
      DebitAmt: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      CreditAmt: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      BalanceAmt: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
    formArray.push(formGroup);
    this.rowCustBankStmnt++;
    console.log(this.CustBankAccForm.controls['BankBranch']);
  }

  removeCustBankStmnt(i){
    var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    formArray.removeAt(i);
    this.rowCustBankStmnt--;
  }

  getLookupRefBankResponse(e){
    this.CustBankAccForm.patchValue({
      RefBankId: e.refBankId,
      BankBranchRegRptCode: e.regRptCode
    });
  }

  Save(enjiForm){
    var formData = this.CustBankAccForm.value;
    var custBankAccObj = new CustBankAccObj();
    custBankAccObj.CustBankAccId = formData.CustBankAccId;
    custBankAccObj.CustId = formData.CustId;
    custBankAccObj.RefBankId = formData.RefBankId;
    custBankAccObj.BankBranch = formData.BankBranch;
    custBankAccObj.BankAccNo = formData.BankAccNo;
    custBankAccObj.BankAccName = formData.BankAccName;
    custBankAccObj.IsBankStmnt = formData.IsBankStmnt;
    custBankAccObj.BankBranchRegRptCode = formData.BankBranchRegRptCode;
    custBankAccObj.BalanceAmt = formData.BalanceAmt;
    custBankAccObj.IsDefault = formData.IsDefault;

    if(formData.IsBankStmnt){
      var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
      var listCustBankStmntD = new Array<CustBankStmntDObj>();
      var totalBalance = 0;
      for (const key in formArray) {
        const bankStmnt = formArray.at(parseInt(key)).value;
        var custBankStmntD = new CustBankStmntDObj();
        custBankStmntD.CustBankStmntHId = bankStmnt.CustBankStmntHId;
        custBankStmntD.Month = bankStmnt.Month;
        custBankStmntD.Year = bankStmnt.Year;
        custBankStmntD.DebitAmt = bankStmnt.DebitAmt;
        custBankStmntD.CreditAmt = bankStmnt.CreditAmt;
        custBankStmntD.BalanceAmt = bankStmnt.BalanceAmt;
        listCustBankStmntD.push(custBankStmntD);
        totalBalance += bankStmnt.BalanceAmt;
      }

      var custBankStmntH = new CustBankStmntHObj();
      custBankStmntH.CustId = formData.CustId;
      custBankStmntH.CustBankAccId = formData.CustBankAccId;
      custBankStmntH.InputDt = new Date();
      custBankStmntH.InputBy = 
      custBankStmntH.StartPeriod = new Date();
      custBankStmntH.EndPeriod = new Date();
      custBankStmntH.BalanceAmt = totalBalance;
      custBankAccObj.BalanceAmt = totalBalance;
    }

    if(this.pageType == "add"){

    }
    else if(this.pageType == "edit"){
      
    }
  }

}
