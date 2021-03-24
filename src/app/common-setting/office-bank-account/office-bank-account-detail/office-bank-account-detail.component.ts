import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { RefCurrObj } from 'app/shared/model/RefCurrObj.Model';
import { OfficeBankAccObj } from 'app/shared/model/common-setting/OfficeBankAcc.Model';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { PathConstant } from 'app/shared/PathConstant';

@Component({
  selector: 'app-office-bank-account-detail',
  templateUrl: './office-bank-account-detail.component.html'
})
export class OfficeBankAccountDetailComponent implements OnInit {
  title: string;
  Mode: string = "Add";
  OfficeBankAccId: number;
  RefOfficeId: number;
  IsCbLegalDocChecked: boolean = false;
  OfficeCode: string;
  BankId: number;
  BankAccType: string;
  CurrId: number;
  BankAccPurpose: string;

  public OfficeNameList: {
    Key: string,
    Value: string
  }[] = [];

  public BankNameList: {
    Key: string,
    Value: string
  }[] = [];

  public BankAccTypeList: {
    Key: string,
    Value: string
  }[] = [];

  public CurrNameList: {
    Key: string,
    Value: string
  }[] = [];

  public BankAccPurposeList: {
    Key: string,
    Value: string
  }[] = [];

  OfficeBankAccObj: OfficeBankAccObj = new OfficeBankAccObj();
  RefOfficeObj: RefOfficeObj = new RefOfficeObj();
  RefCurrObj: RefCurrObj = new RefCurrObj();
  RefBankObj: RefBankObj = new RefBankObj();

  OfficeBankAccForm = this.fb.group({
    AccCode: ['', [Validators.required, Validators.maxLength(50)]],
    AccName: ['', [Validators.required, Validators.maxLength(500)]],
    BankBranch: ['', [Validators.required, Validators.maxLength(100)]],
    BankBranchBiCode: ['', [Validators.maxLength(100)]],
    AccNo: ['', [Validators.required, Validators.maxLength(200)]],
    OfficeName: ['', [Validators.required]],
    BankName: ['', [Validators.required]],
    BankAccType: ['', [Validators.required]],
    CurrName: ['', [Validators.required]],
    LegalDoc: [false],
    BankAccPurpose: ['', [Validators.required]],
  });

  constructor(private route: ActivatedRoute,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["OfficeBankAccId"] != null) {
        this.OfficeBankAccId = params["OfficeBankAccId"];
      }
    });
  }

  ngOnInit() {
    if (this.OfficeBankAccId !=null && this.OfficeBankAccId != 0)
    {
      this.Mode = "Edit";
    }
    else {this.Mode = "Add";}
    this.route.data.subscribe(
      (data: Data) => {
        this.title = data['title'];
      }
    )

    this.http.post<any>(URLConstant.GetListActiveBankName, {}).subscribe(
      (response) => {
        this.BankNameList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    this.http.post<any>(URLConstant.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "BANK_ACC_TYPE" }).subscribe(
      (response) => {
        this.BankAccTypeList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    this.http.post<any>(URLConstant.GetListKvpActiveRefCurr, {}).subscribe(
      (response) => {
        this.CurrNameList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    this.http.post<any>(URLConstant.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: "BANK_ACC_PURPOSE" }).subscribe(
      (response) => {
        this.BankAccPurposeList = response.ReturnObject;
      },
      (error) => {
        console.log(error);
      }
    )

    if (this.Mode == "Add") {
      this.http.post<any>(URLConstant.GetListKvpActiveRefOfficeForPaging, {}).subscribe(
        (response) => {
          this.OfficeNameList = response.ReturnObject;
        },
        (error) => {
          console.log(error);
        }
      )
    } else if (this.Mode === "Edit") {
      this.OfficeBankAccObj.OfficeBankAccId = this.OfficeBankAccId;

      this.http.post<OfficeBankAccObj>(URLConstant.GetOfficeBankAccByOfficeBankAccId, {Id: this.OfficeBankAccId}).subscribe(
        (response) => {
          this.OfficeBankAccObj = response;
          this.BankAccType = this.OfficeBankAccObj.BankAccType;
          this.BankAccPurpose = this.OfficeBankAccObj.MrBankAccPurposeCode;

          this.OfficeBankAccForm.patchValue({
            AccCode: this.OfficeBankAccObj.OfficeBankAccCode,
            AccName: this.OfficeBankAccObj.OfficeBankAccName,
            BankBranch: this.OfficeBankAccObj.OfficeBankAccBranch,
            BankBranchBiCode: this.OfficeBankAccObj.BankBranchRegRptCode,
            AccNo: this.OfficeBankAccObj.OfficeBankAccNo,
            BankAccType: this.OfficeBankAccObj.BankAccType,
            LegalDoc: this.OfficeBankAccObj.IsLegalDoc,
            BankAccPurpose: this.OfficeBankAccObj.MrBankAccPurposeCode
          })

          this.RefOfficeObj.RefOfficeId = response.RefOfficeId;
          this.http.post<RefOfficeObj>(URLConstant.GetRefOfficeByRefOfficeId, {Id : response.RefOfficeId}).subscribe(
            (response) => {
              this.RefOfficeObj = response;
              this.RefOfficeId = this.RefOfficeObj.RefOfficeId;
              this.OfficeBankAccForm.patchValue(
                {
                  OfficeName : this.RefOfficeObj.OfficeName
                }
              );
              this.OfficeBankAccForm.updateValueAndValidity();
            },
            (error) => {
              console.log(error);
            }
          );

          this.RefCurrObj.RefCurrId = response.RefCurrId;
          this.http.post<RefCurrObj>(URLConstant.GetRefCurrById, {Id: response.RefCurrId}).subscribe(
            (response) => {
              this.RefCurrObj = response;
              this.CurrId = this.RefCurrObj.RefCurrId;

              this.OfficeBankAccForm.patchValue({
                CurrName: this.RefCurrObj.RefCurrId
              })
              this.OfficeBankAccForm.updateValueAndValidity();
            },
            (error) => {
              console.log(error);
            }
          );

          this.RefBankObj.RefBankId = response.RefBankId;
          this.http.post<RefBankObj>(URLConstant.GetRefBankByRefBankIdAsync, {Id: response.RefBankId}).subscribe(
            (response) => {
              this.RefBankObj = response;
              this.BankId = this.RefBankObj.RefBankId;

              this.OfficeBankAccForm.patchValue({
                BankName: this.RefBankObj.RefBankId
              })
              this.OfficeBankAccForm.updateValueAndValidity();
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onChangedDdlOfficeName(ev) {
    this.OfficeCode = ev.target.value;
  }

  onChangedDdlBankName(ev) {
    this.BankId = ev.target.value;
  }

  onChangedDdlBankAccType(ev) {
    this.BankAccType = ev.target.value;
  }

  onChangedDdlCurrName(ev) {
    this.CurrId = ev.target.value;
  }

  onChangedDdlBankAccPurpose(ev) {
    this.BankAccPurpose = ev.target.value;
  }

  CbLegalDocChange() {

  }

  SaveForm() {
    console.log("Test");
    this.OfficeBankAccObj.OfficeBankAccCode = this.OfficeBankAccForm.value.AccCode;
    this.OfficeBankAccObj.OfficeBankAccName = this.OfficeBankAccForm.value.AccName;
    this.OfficeBankAccObj.OfficeBankAccBranch = this.OfficeBankAccForm.value.BankBranch;
    this.OfficeBankAccObj.BankBranchRegRptCode = this.OfficeBankAccForm.value.BankBranchBiCode;
    this.OfficeBankAccObj.OfficeBankAccBranch = this.OfficeBankAccForm.value.BankBranch;
    this.OfficeBankAccObj.OfficeBankAccNo = this.OfficeBankAccForm.value.AccNo;
    this.OfficeBankAccObj.RefBankId = this.BankId;
    this.OfficeBankAccObj.BankAccType = this.BankAccType;
    this.OfficeBankAccObj.RefCurrId = this.CurrId;
    this.OfficeBankAccObj.IsLegalDoc = this.IsCbLegalDocChecked;
    this.OfficeBankAccObj.MrBankAccPurposeCode = this.BankAccPurpose;
    this.OfficeBankAccObj.RowVersion = "";

    if (this.Mode == "Add") {
      this.RefOfficeObj.OfficeCode = this.OfficeCode;
      this.http.post<RefOfficeObj>(URLConstant.GetRefOfficeByOfficeCode, {Code : this.OfficeCode}).subscribe(
        (response) => {
          this.OfficeBankAccObj.RefOfficeId = response.RefOfficeId;
          this.OfficeBankAccObj.IsActive = true;

          this.http.post(URLConstant.SubmitOfficeBankAcc, this.OfficeBankAccObj).subscribe(
            (response) => {
              this.toastr.successMessage("Add Success!");
              this.router.navigateByUrl(PathConstant.CS_OFFICE_BANK_ACCOUNT_PAGING);
            },
            error => {
              console.log(error);
            }
          )
        },
        (error) => {
          console.log(error);
        }
      );


    } else{
      this.OfficeBankAccObj.OfficeBankAccId = this.OfficeBankAccId;
      this.OfficeBankAccObj.RefOfficeId = this.RefOfficeId;

      this.http.post(URLConstant.SubmitOfficeBankAcc, this.OfficeBankAccObj).subscribe(
        (response) => {
          this.toastr.successMessage("Edit Success!");
          this.router.navigateByUrl(NavigationConstant.CS_OFFICE_BANK_ACCOUNT_PAGING);
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}