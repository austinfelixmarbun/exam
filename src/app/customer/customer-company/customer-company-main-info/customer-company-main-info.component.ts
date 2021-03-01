import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-customer-company-main-info',
  templateUrl: './customer-company-main-info.component.html'
})
export class CustomerCompanyMainInfoComponent implements OnInit {

  tempCustModel: any;
  tempCompanyTypeCode: any;

  IsVip: boolean;
  VipNotesRequired: boolean;

  TaxIdNo: string;
  VipNotes: string;
  CustName: string;
  CustModel: string;
  MrIdTypeCode: string;
  IsAffiliateWithMf: string;
  MrCompanyTypeCode: string;
  GetListActiveRefMasterUrl: string;
  GetListActiveRefMasterWithMappingCodeAllUrl: string;
  inputFieldObj: InputFieldObj;
  inputAddressObj: InputAddressObj;

  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\.[0-9]{1}\-[0-9]{3}\.[0-9]{3}$")]],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['', [Validators.required]]
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING2;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.GetListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.GetListActiveRefMasterWithMappingCodeAllUrl = URLConstant.GetListActiveRefMasterWithMappingCodeAll;
  }

  ngOnInit() {
    this.VipNotesRequired = true;

    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = new UcAddressObj();
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;

    var refMasterObjCustModel = {
      MrCustTypeCode: CommonConstant.CustTypeCompany
    }
    this.http.post(URLConstant.GetListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );

    var refMasterObjMrCompanyTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCompanyType,
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response[CommonConstant.ReturnObj];
        if (this.tempCompanyTypeCode.length > 0) {
          this.CustomerCompanyForm.patchValue({
            MrCompanyTypeCode: this.tempCompanyTypeCode[0].Key
          });
        }
      }
    );
  }
  SaveValue() {
    this.CustName = this.CustomerCompanyForm.controls["CustName"].value;
    this.TaxIdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.CustModel = this.CustomerCompanyForm.controls["CustModel"].value;
    this.MrCompanyTypeCode = this.CustomerCompanyForm.controls["MrCompanyTypeCode"].value;
    this.IsVip = this.CustomerCompanyForm.controls["IsVip"].value;
    this.IsAffiliateWithMf = this.CustomerCompanyForm.controls["IsAffiliateWithMf"].value;

    if (this.IsVip == true) {
      this.VipNotes = this.CustomerCompanyForm.controls["VipNotes"].value;
    }

    var custAddr = new Object();
    var formValue = this.CustomerCompanyForm.value;
    custAddr["Addr"] = formValue["UcAddress"]["Addr"];
    custAddr["AreaCode1"] = formValue["UcAddress"]["AreaCode1"];
    custAddr["AreaCode2"] = formValue["UcAddress"]["AreaCode2"];
    custAddr["AreaCode3"] = formValue["UcAddress"]["AreaCode3"];
    custAddr["AreaCode4"] = formValue["UcAddress"]["AreaCode4"];
    custAddr["City"] = formValue["UcAddress"]["City"];
    custAddr["Zipcode"] = formValue["UcAddressZipcode"]["value"];
    custAddr["SubZipcode"] = formValue["UcAddressZipcode"]["value"];
    sessionStorage.setItem("CustAddr", JSON.stringify(custAddr));
    
    AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_COY_DUP_CHECK],{ "CustModel": this.CustModel, "CustName": this.CustName, "MrCompanyTypeCode": this.MrCompanyTypeCode, "MrIdTypeCode": this.MrIdTypeCode, "TaxIdNo": this.TaxIdNo, "IsAffiliateWithMf": this.IsAffiliateWithMf, "IsVip": this.IsVip, "VipNotes": this.VipNotes });
  }

  checkState() {
    if (this.CustomerCompanyForm.controls.IsVip.value === true) {
      this.CustomerCompanyForm.patchValue({
        VipNotes: null
      });
      this.CustomerCompanyForm.controls.VipNotes.disable();
      this.VipNotesRequired = false;
      this.CustomerCompanyForm.controls.IdExpiredDt.clearValidators();



    } else {
      this.CustomerCompanyForm.controls.VipNotes.enable();
      this.CustomerCompanyForm.controls.VipNotes.setValidators(Validators.required);
      this.VipNotesRequired = true;
    }
    this.CustomerCompanyForm.controls.VipNotes.updateValueAndValidity();
  }
}
