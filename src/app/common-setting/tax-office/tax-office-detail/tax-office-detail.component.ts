
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { RefTaxOfficeObj } from 'app/shared/model/common-setting/ref-tax-office-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-tax-office-detail',
  templateUrl: './tax-office-detail.component.html'
})
export class TaxOfficeDetailComponent implements OnInit {
  type: string = "add";
  refTaxOfficeId: number = 0;
  refTaxOfficeObj: RefTaxOfficeObj = new RefTaxOfficeObj();
  InputLookupBankObj: InputLookupObj = new InputLookupObj();
  TaxOfficeForm = this.fb.group({
    TaxOfficeCode: ['', Validators.required],
    TaxOfficeName: ['', Validators.required],
    IsActive: [true],
    RefBankId: [0, Validators.required],
    BankAccNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    BankAccName: ['', Validators.required],
    BankBranchBiCode: ['', Validators.required],
    RowVersion: ['']
  })

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: NGXToastrService) { 
      this.route.queryParams.subscribe(params => {
        if (params["mode"] != null) {
        this.type = params["mode"];
        }
        if (params["RefTaxOfficeId"] != null) {
        this.refTaxOfficeId = params["RefTaxOfficeId"];
        }
      });
    }

  ngOnInit() {
    this.InputLookupBankObj.urlJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.InputLookupBankObj.pagingJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.InputLookupBankObj.genericJson = "./assets/uclookup/Customer/lookupBank_CustBankAcc_CustFinData.json";
    this.InputLookupBankObj.isReady = true;

    if(this.type == "edit"){
      let ReqByIdObj = new GenericObj();
      ReqByIdObj.Id = this.refTaxOfficeId;
      this.http.post(URLConstant.GetRefTaxOfficeDetailById, ReqByIdObj).subscribe(
        (response: RefTaxOfficeObj) => {
          console.log(response);
          this.TaxOfficeForm.patchValue({
            TaxOfficeCode: response.TaxOfficeCode,
            TaxOfficeName: response.TaxOfficeName,
            IsActive: response.IsActive,
            RefBankId: response.RefBankId,
            BankAccNo: response.BankAccNo,
            BankAccName: response.BankAccName,
            BankBranchBiCode: response.BankBranchBiCode,
            RowVersion: response.RowVersion
          });
          this.InputLookupBankObj.nameSelect = response.BankName;
          this.InputLookupBankObj.jsonSelect = { BankName: response.BankName}
        }
      );
    }
  }

  GetBank(event) {
    this.TaxOfficeForm.patchValue({
      RefBankId: event.RefBankId,
      BankBranchBiCode: event.RegRptCode,
    });
  }

  SaveForm(){
    let urlAddEdit = URLConstant.AddRefTaxOffice;
    this.refTaxOfficeObj = this.TaxOfficeForm.value;
    this.refTaxOfficeObj.BankBranchBiCode = this.TaxOfficeForm.controls.BankBranchBiCode.value;

    if(this.type == 'edit'){
      urlAddEdit = URLConstant.EditRefTaxOffice;
      this.refTaxOfficeObj.RefTaxOfficeId = this.refTaxOfficeId;
    }

    this.http.post(urlAddEdit, this.refTaxOfficeObj, AdInsConstant.SpinnerOptions).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.RedirectPaging();
        }
      );
  }

  RedirectPaging(){
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CS_REF_TAX_OFFICE_PAGING],{});
  }
}
