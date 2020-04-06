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
  @Input() modalTitle: string;
  @Input() isAddBankStatement: boolean;
  @Input() CustBankAccId: number;
  monthOfYear: Array<string>;
  rowCustBankStmnt: number;
  inputLookupBank: InputLookupObj;
  maxYear: number;
  bankName: string;
  private custBankStmntH: CustBankStmntHObj;

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
    this.rowCustBankStmnt = 0;
    this.maxYear = moment().year();
    this.custBankStmntH = new CustBankStmntHObj();
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

    if (this.pageType == "edit") {
      var custBankAcc = new CustBankAccObj();
      custBankAcc.CustBankAccId = this.CustBankAccId;
      this.httpClient.post(AdInsConstant.GetCustBankAccByCustBankAccIdWithRefBank, custBankAcc).subscribe(
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
            IsBankStmnt: true,
            BankBranchRegRptCode: response.CustBankAccObj.BankBranchRegRptCode,
            BalanceAmt: response.CustBankAccObj.BalanceAmt,
            IsDefault: response.CustBankAccObj.IsDefault,
            IsActive: response.CustBankAccObj.IsActive,
            RowVersion: response.CustBankAccObj.RowVersion
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else if (this.pageType == "editStmnt") {
      var custBankAcc = new CustBankAccObj();
      custBankAcc.CustBankAccId = this.CustBankAccId;
      this.httpClient.post(AdInsConstant.GetCBAForCustFinDataEditModeByCustBankAccId, custBankAcc).subscribe(
        (response: any) => {
          this.bankName = response.RefBankObj.BankName;
          this.CustBankAccForm.patchValue({
            CustBankAccId: response.CustBankAccObj.CustBankAccId,
            CustId: response.CustBankAccObj.CustId,
            RefBankId: response.CustBankAccObj.RefBankId,
            BankBranch: response.CustBankAccObj.BankBranch,
            BankAccNo: response.CustBankAccObj.BankAccNo,
            BankAccName: response.CustBankAccObj.BankAccName,
            IsBankStmnt: response.CustBankAccObj.IsBankStmnt,
            BankBranchRegRptCode: response.CustBankAccObj.BankBranchRegRptCode,
            BalanceAmt: response.CustBankAccObj.BalanceAmt,
            IsDefault: response.CustBankAccObj.IsDefault,
            IsActive: response.CustBankAccObj.IsActive,
            RowVersion: response.CustBankAccObj.RowVersion
          });

          if (response.CustBankAccObj.IsBankStmnt) {
            var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
            this.custBankStmntH = new CustBankStmntHObj();
            this.custBankStmntH.CustBankStmntHId = response.CustBankStmntHObj.CustBankStmntHId;
            this.custBankStmntH.CustId = response.CustBankStmntHObj.CustId;
            this.custBankStmntH.CustBankAccId = response.CustBankStmntHObj.CustBankAccId;
            this.custBankStmntH.InputDt = response.CustBankStmntHObj.InputDt;
            this.custBankStmntH.InputBy = response.CustBankStmntHObj.InputBy;
            this.custBankStmntH.StartPeriod = response.CustBankStmntHObj.StartPeriod;
            this.custBankStmntH.EndPeriod = response.CustBankStmntHObj.EndPeriod;
            this.custBankStmntH.BalanceAmt = response.CustBankStmntHObj.BalanceAmt;
            this.custBankStmntH.RowVersion = response.CustBankStmntHObj.RowVersion;

            for (const item of response.CustBankStmntDObjs) {
              var formGroup = this.fb.group({
                CustBankStmntDId: [item.CustBankStmntDId, [Validators.required]],
                CustBankStmntHId: [item.CustBankStmntHId, [Validators.required]],
                Month: [this.monthOfYear.indexOf(item.Month), [Validators.required]],
                Year: [item.Year, [Validators.required, Validators.pattern("^[0-9]+$")]],
                DebitAmt: [item.DebitAmt, [Validators.required, Validators.pattern("^[0-9]+$")]],
                CreditAmt: [item.CreditAmt, [Validators.required, Validators.pattern("^[0-9]+$")]],
                BalanceAmt: [item.BalanceAmt, [Validators.required, Validators.pattern("^[0-9]+$")]],
                RowVersion: [item.RowVersion]
              });
              formArray.push(formGroup);
              this.rowCustBankStmnt++;
            }
          }
        },
        (error) => {
          console.log(error);
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
      CustBankStmntDId: [0, [Validators.required]],
      CustBankStmntHId: [this.custBankStmntH.CustBankStmntHId, [Validators.required]],
      Month: ['', [Validators.required]],
      Year: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      DebitAmt: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      CreditAmt: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      BalanceAmt: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      RowVersion: ['']
    });
    formArray.push(formGroup);
    this.rowCustBankStmnt++;
  }

  removeCustBankStmnt(i) {
    var confirmation = confirm("Are you sure to delete this data ?");
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
    custBankAccObj.BalanceAmt = formData.BalanceAmt;
    custBankAccObj.IsDefault = formData.IsDefault;
    custBankAccObj.RowVersion = formData.RowVersion;
    custBankAccObj.IsActive = formData.IsActive;

    if (this.pageType == "add") {
      this.httpClient.post(AdInsConstant.AddCustBankAcc, custBankAccObj).subscribe(
        (response) => {
          this.activeModal.close(response);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      var url;

      if (this.pageType == "edit") {
        var custBankData = this.CustBankAccForm.value;
        this.httpClient.post(AdInsConstant.EditCustBankAcc, custBankData).subscribe(
          (response) => {
            this.activeModal.close(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
      else if(this.pageType == "editStmnt"){
        var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
        var formArray = this.CustBankAccForm.get('CustBankStmnts') as FormArray;
        var listCustBankStmntD = new Array<CustBankStmntDObj>();
        var totalBalance = 0;
        for (var i = 0; i < formArray.length; i++) {
          const bankStmnt = formArray.at(i).value;
          for (var j = 0; j < formArray.length; j++){
            if(i == j){
              continue;
            }
            const bankStmntCompare = formArray.at(j).value;
            if(bankStmnt.Month == bankStmntCompare.Month && bankStmnt.Year == bankStmntCompare.Year){
              this.toastr.errorMessage("Cannot Input Statement With The Same Month and Year");
              return false;
            }
          }
          var custBankStmntD = new CustBankStmntDObj();
          custBankStmntD.CustBankStmntHId = bankStmnt.CustBankStmntHId;
          custBankStmntD.RowVersion = bankStmnt.RowVersion;
          custBankStmntD.Month = this.monthOfYear[bankStmnt.Month];
          custBankStmntD.Year = bankStmnt.Year;
          custBankStmntD.DebitAmt = bankStmnt.DebitAmt;
          custBankStmntD.CreditAmt = bankStmnt.CreditAmt;
          custBankStmntD.BalanceAmt = bankStmnt.BalanceAmt;
          listCustBankStmntD.push(custBankStmntD);
          totalBalance += bankStmnt.BalanceAmt;
        }

        var custBankStmntH = new CustBankStmntHObj();
        custBankStmntH.CustBankStmntHId = this.custBankStmntH.CustBankStmntHId;
        custBankStmntH.RowVersion = this.custBankStmntH.RowVersion;
        custBankStmntH.CustId = formData.CustId;
        custBankStmntH.CustBankAccId = formData.CustBankAccId;
        custBankStmntH.InputDt = new Date();
        custBankStmntH.InputBy = currentUserContext.UserName;
        custBankStmntH.StartPeriod = new Date();
        custBankStmntH.EndPeriod = new Date();
        custBankStmntH.BalanceAmt = totalBalance;

        var reqObj = { "custBankAccObj": custBankAccObj, "custBankStmntH": custBankStmntH, "custBankStmntDObjs": listCustBankStmntD };
        this.httpClient.post(AdInsConstant.EditCBAForCustFinData, reqObj).subscribe(
          (response) => {
            this.activeModal.close(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
