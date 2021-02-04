import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustBankAccObj } from 'app/shared/model/CustBankAccObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CustBankStmntObj } from 'app/shared/model/CustBankStmntObj.Model';
import { CustBankStmntHObj } from 'app/shared/model/CustBankStmntHObj.Model';

@Component({
  selector: 'app-cust-bank-acc-detail-section-findata',
  templateUrl: './cust-bank-acc-detail-section-findata.component.html',
  providers: [NGXToastrService]
})
export class CustBankAccDetailSectionFindataComponent implements OnInit {
  @Input() CustId: number;
  @Input() pageType: string;
  @Input() modalTitle: string;
  @Input() isAddBankStatement: boolean;
  @Input() CustBankAccId: number;
  monthOfYear: Array<string>;
  rowCustBankStmnt: number;
  inputLookupBank: InputLookupObj;
  maxYear: number;
  bankName: string;
  IsActive : boolean;
  begBalance: number;
  isAlreadyCalc: boolean = false;

  private custBankStmntH: CustBankStmntHObj;
  private custBankStmnt: CustBankStmntObj;//yang dipakai tanpa H&D

  CustBankAccForm = this.fb.group({
    CustBankAccId: [0, [Validators.required]],
    CustId: [0, [Validators.required]],
    RefBankId: [0, [Validators.required]],
    BankBranch: ['', [Validators.required]],
    BankAccNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    BankAccName: ['', [Validators.required]],
    IsBankStmnt: [false],
    BankBranchRegRptCode: [''],
    BalanceAmt: [0],
    IsDefault: [false],
    IsActive: [false],
    BegBalanceAmt: [0],
    RowVersion: [''],
    CustBankStmnts: this.fb.array([])
  });

  constructor(
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal, 
    private cookieService: CookieService
  ) {
    moment.locale('en');
    this.monthOfYear = new Array(...moment.months());
    this.rowCustBankStmnt = 0;
    this.maxYear = moment().year();
    this.custBankStmnt = new CustBankStmntObj();
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
    criteriaObj.value = CommonConstant.TRUE_CONDITION;
    criteriaList.push(criteriaObj);
    this.inputLookupBank.addCritInput = criteriaList;

    this.CustBankAccForm.patchValue({
      CustId: this.CustId
    });

    if (this.pageType == "edit") {
      var custBankAcc = new CustBankAccObj();
      custBankAcc.CustBankAccId = this.CustBankAccId;
      this.httpClient.post(URLConstant.GetCustBankAccByCustBankAccIdWithRefBank, custBankAcc).subscribe(
        (response: any) => {
          this.inputLookupBank.nameSelect = response.RefBankObj.BankName;
          this.inputLookupBank.jsonSelect = response.RefBankObj;
          this.CustBankAccForm.patchValue({
            CustBankAccId: response.CustBankAccObj.CustBankAccId,
            CustId: response.CustBankAccObj.CustId,
            RefBankId: response.CustBankAccObj.RefBankId,
            BankBranch: response.CustBankAccObj.BankBranch,
            BankAccNo: response.CustBankAccObj.BankAccNo,
            BankAccName: response.CustBankAccObj.BankAccName,
            IsBankStmnt: response.CustBankAccObj.IsBankStmnt,
            BankBranchRegRptCode: response.CustBankAccObj.BankBranchRegRptCode,
            BalanceAmt: parseFloat(response.CustBankAccObj.BalanceAmt),
            IsDefault: response.CustBankAccObj.IsDefault,
            IsActive: response.CustBankAccObj.IsActive,
            RowVersion: response.CustBankAccObj.RowVersion
          });
          this.CheckDefault();
        }
      );
    }
    else if (this.pageType == "editStmnt") {
      var custBankAcc = new CustBankAccObj();
      custBankAcc.CustBankAccId = this.CustBankAccId;

      this.CustBankAccForm.controls['BegBalanceAmt'].setValidators([Validators.required]);

      this.httpClient.post(URLConstant.GetCBAForCustFinDataEditModeByCustBankAccId, custBankAcc).subscribe(
        (response: any) => {          
          this.bankName = response.RefBankObj.BankName;
          this.CustBankAccForm.patchValue({
            CustBankAccId: response.CustBankAccObj.CustBankAccId,
            CustId: response.CustBankAccObj.CustId,
            RefBankId: response.CustBankAccObj.RefBankId,
            BankBranch: response.CustBankAccObj.BankBranch,
            BankAccNo: response.CustBankAccObj.BankAccNo,
            BankAccName: response.CustBankAccObj.BankAccName,
            IsBankStmnt: true,
            BankBranchRegRptCode: response.CustBankAccObj.BankBranchRegRptCode,
            BalanceAmt: parseFloat(response.CustBankAccObj.BalanceAmt),
            IsDefault: response.CustBankAccObj.IsDefault,
            IsActive: response.CustBankAccObj.IsActive,
            //BegBalanceAmt: response.CustBankStmntHObj.BegBalanceAmt,
            RowVersion: response.CustBankAccObj.RowVersion
          });
          this.CheckDefault();
          if (response.CustBankAccObj.IsBankStmnt) {
            // if(response.CustBankStmntObjs != undefined){ //perubahan cara baca ke cust bank stmnt obj bukan dari H&D
            //   if(response.CustBankStmntObjs.length > 0)
            //   {  
            //     //get min year
            //     var listyear = response.CustBankStmntObjs.map(function(a){
            //       return a.Year;
            //     });
            //     var minyear = listyear.reduce(function (a, b) { return a < b ? a : b; }); 
            //     //get min month in year

            //     var listmonth = response.CustBankStmntObjs.filter(x => x.Year == minyear).map(function(a){
            //       return a.Month;
            //     });
            //     var listmonthidx: Array<number> = new Array();

            //     listmonth.forEach(element => {
            //       listmonthidx.push(this.monthOfYear.indexOf(element));
            //     });

            //     var minmonthidx = listmonthidx.reduce(function (a, b) { return a < b ? a : b; });
              
            //     if(minmonthidx != undefined)
            //     {
            //       var minmonth = this.monthOfYear[minmonthidx];
            //       var minObj = response.CustBankStmntObjs.filter(function(a){
            //         return a.Year == minyear && a.Month == minmonth;
            //       });

            //       if (minObj[0] != undefined) {
            //         if (minObj[0].BegBalanceAmt != undefined) {
            //           //ambil cust bank statement yang terawal
            //           this.CustBankAccForm.patchValue({
            //             BegBalanceAmt: minObj[0].BegBalanceAmt,
            //           });
            //         }
            //       }
            //     }
            //   }
            // }

            this.CustBankAccForm.patchValue({
              BegBalanceAmt: response.CustBankAccObj.BegBalanceAmt,
            });

            //tidak dipakai
            var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
            for (const item of response.CustBankStmntObjs) {
              var formGroup = this.fb.group({
                CustBankStmntId: [item.CustBankStmntId, [Validators.required]],
                Month: [this.monthOfYear.indexOf(item.Month), [Validators.required]],
                Year: [item.Year, [Validators.required, Validators.pattern("^[0-9]+$")]],
                DebitTrxCount: [(item.DebitTrxCount == undefined ? 0 : item.DebitTrxCount), [Validators.required, Validators.min(0), Validators.max(9999)]],
                DebitAmt: [item.DebitAmt, [Validators.required]],
                CreditTrxCount: [(item.CreditTrxCount == undefined ? 0 : item.CreditTrxCount), [Validators.required, Validators.min(0), Validators.max(9999)]],
                CreditAmt: [item.CreditAmt, [Validators.required]],
                BalanceAmt: [parseFloat(item.BalanceAmt)],
                RowVersion: [item.RowVersion]
              });
              formArray.push(formGroup);
              this.rowCustBankStmnt++;
            }
          }
        }
      );
    }
  }

  addRowCustBankStmnt() {
    if (this.rowCustBankStmnt == 12) {
      return false;
    }

    var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    var formGroup = this.fb.group({
      CustBankStmntId: [this.custBankStmnt.CustBankStmntId, [Validators.required]],
      Month: ['', [Validators.required]],
      Year: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      DebitTrxCount: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      DebitAmt: [0, [Validators.required]],
      CreditTrxCount: [0, [Validators.required, Validators.min(0), Validators.max(9999)]],
      CreditAmt: [0, [Validators.required]],
      BalanceAmt: [''],
      RowVersion: ['']
    });
    formArray.push(formGroup);
    this.rowCustBankStmnt++;

    this.isAlreadyCalc = false;
  }

  ChangeTrxCountDebit(i){
    var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    var controlDebitAmt = formArray.at(i).get('DebitAmt');
    var controlDebitTrxCount = formArray.at(i).value.DebitTrxCount;
    if(controlDebitTrxCount != undefined)
    {
      if(controlDebitTrxCount > 0){
        controlDebitAmt.setValidators([Validators.required, Validators.min(0.01)]);
        controlDebitAmt.updateValueAndValidity();
      }else if(controlDebitTrxCount == 0){
        controlDebitAmt.clearValidators();
        controlDebitAmt.updateValueAndValidity();
      }
    }
  }

  ChangeTrxCountCredit(i){
    var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
    var controlCreditAmt = formArray.at(i).get('CreditAmt');
    var controlCreditTrxCount = formArray.at(i).value.CreditTrxCount;
    if(controlCreditTrxCount != undefined)
    {
      if(controlCreditTrxCount > 0){
        controlCreditAmt.setValidators([Validators.required, Validators.min(0.01)]);
        controlCreditAmt.updateValueAndValidity();
      }else if(controlCreditTrxCount == 0){
        controlCreditAmt.clearValidators();
        controlCreditAmt.updateValueAndValidity();
      }
    }
  }

  removeCustBankStmnt(i) {
    var confirmation = confirm(ExceptionConstant.DELETE_CONFIRMATION);
    if(confirmation == true){
      var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
      formArray.removeAt(i);
      this.rowCustBankStmnt--;
    }
  }

  getLookupRefBankResponse(e) {
    this.CustBankAccForm.patchValue({
      RefBankId: e.refBankId,
      BankBranchRegRptCode: e.regRptCode
    });
  }

  calculate()
  {
    this.begBalance = this.CustBankAccForm.controls['BegBalanceAmt'].value;

    var startBegBalance = this.begBalance;

    var arrayControl = this.CustBankAccForm.get('CustBankStmnts') as FormArray;

    for (let i = 0;i < arrayControl.length;i++) 
    {
      const bankStmntD = arrayControl.at(i).value;

      bankStmntD.BalanceAmt = startBegBalance - bankStmntD.DebitAmt + bankStmntD.CreditAmt;
      startBegBalance = bankStmntD.BalanceAmt;
    }

    this.isAlreadyCalc = true;
  }

  onBegBalanceAmtChange(e)
  {
    this.isAlreadyCalc = false;
  }
  onDebitAmtChange(e)
  {
    this.isAlreadyCalc = false;
  }

  onCreditAmtChange(e)
  {
    this.isAlreadyCalc = false;
  }

  onMonthChange()
  {
    this.isAlreadyCalc = false;
  }

  Save(enjiForm) {

    

    
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
    custBankAccObj.BalanceAmt = parseFloat(formData.BalanceAmt);
    custBankAccObj.IsDefault = formData.IsDefault;
    custBankAccObj.RowVersion = formData.RowVersion;
    custBankAccObj.IsActive = this.IsActive;
    custBankAccObj.BegBalanceAmt = formData.BegBalanceAmt;


    if (this.pageType == "add") {
      this.httpClient.post(URLConstant.AddCustBankAcc, custBankAccObj).subscribe(
        (response) => {
          this.activeModal.close(response);
        }
      );
    }
    else {
      var url;

      if (this.pageType == "edit") {
        var custBankData = this.CustBankAccForm.value;
        this.httpClient.post(URLConstant.EditCustBankAcc, custBankData).subscribe(
          (response) => {
            this.activeModal.close(response);
          }
        );
      }
      else if (this.pageType == "editStmnt") {
        if(this.isAlreadyCalc == false)
        {
          this.toastr.warningMessage(ExceptionConstant.CALC_FIRST);
          return false;
        }
        var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
        var listCustBankStmnt = new Array<CustBankStmntObj>();
        var totalBalance = 0;

        if(formArray.length == 0){
          this.toastr.warningMessage("Please input at least one bank account statement");
          return false;
        }

        for (var i = 0; i < formArray.length; i++) {
          const bankStmnt = formArray.at(i).value;
          for (var j = 0; j < formArray.length; j++) {
            if (i == j) {
              continue;
            }
            const bankStmntCompare = formArray.at(j).value;
            if(bankStmnt.Month == bankStmntCompare.Month && bankStmnt.Year == bankStmntCompare.Year){
              this.toastr.warningMessage(ExceptionConstant.STATEMENT_WITH_SAME_MONTH_AND_YEAR);
              return false;
            }
          }
          var custBankStmnt = new CustBankStmntObj();
          custBankStmnt.CustBankStmntId = bankStmnt.CustBankStmntId;
          custBankStmnt.RowVersion = bankStmnt.RowVersion;
          custBankStmnt.Month = this.monthOfYear[bankStmnt.Month];
          custBankStmnt.Year = bankStmnt.Year;
          custBankStmnt.DebitTrxCount = bankStmnt.DebitTrxCount == "" ? null :bankStmnt.DebitTrxCount;
          custBankStmnt.DebitAmt = bankStmnt.DebitAmt;
          custBankStmnt.CreditTrxCount = bankStmnt.CreditTrxCount == "" ? null :bankStmnt.CreditTrxCount;
          custBankStmnt.CreditAmt = bankStmnt.CreditAmt;
          custBankStmnt.BalanceAmt = parseFloat(bankStmnt.BalanceAmt);
          listCustBankStmnt.push(custBankStmnt);
          totalBalance += parseFloat(bankStmnt.BalanceAmt);
        }

        custBankAccObj.StartPeriod = "";
        custBankAccObj.EndPeriod = "";

        var reqObj = { "custBankAccObj": custBankAccObj, "custBankStmntObjs": listCustBankStmnt };
        this.httpClient.post(URLConstant.EditCBAForCustFinData, reqObj).subscribe(
          (response) => {
            this.activeModal.close(response);
          }
        );
      }
    }
  }
  CheckDefault(){
    if(this.CustBankAccForm.controls.IsDefault.value){
      this.CustBankAccForm.patchValue({
        IsActive : true
      });
      this.IsActive = true;
      this.CustBankAccForm.controls.IsActive.disable();
    }
    else{
      this.IsActive = false;
      this.CustBankAccForm.controls.IsActive.enable();
    }
  }
}
