import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-edit-main-data-company',
  templateUrl: './edit-main-data-company.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class EditMainDataCompanyComponent implements OnInit {
  
  tempCustObj: any;
  tempCustModel: any;
  custCompanyObj: any;
  tempCompanyTypeCode: any;
  tempCustCompanyObj: any;

  custObj: CustObj = new CustObj();

  CustId: number;
  VipNotesRequired : boolean;

  From: string;
  editCustUrl: string;
  editCustCompanyUrl: string;
  getCustByCustIdUrl: string;
  getListActiveRefMasterUrl: string;
  getCustCompanyByCustIdUrl: string;
  GetListActiveRefMasterWithMappingCodeAllUrl : string;
  inputFieldObj: InputFieldObj;
  inputAddressObj: InputAddressObj;
  UcAddressObj: UcAddressObj = new UcAddressObj();
  IsGuarantor: boolean;
  IsFamily: boolean;
  IsShareholder: boolean;
  IsCustomer: boolean;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private toastr: NGXToastrService) {
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.getCustCompanyByCustIdUrl = URLConstant.GetCustCompanyByCustId;
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.editCustUrl = URLConstant.EditCust;
    this.editCustCompanyUrl = URLConstant.EditCustCompany;
    this.GetListActiveRefMasterWithMappingCodeAllUrl = URLConstant.GetListActiveRefMasterWithMappingCodeAll;
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }
  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    IsVip : [true],
    IsAffiliateWithMf: [true],
    VipNotes : ['']
  });

  ngOnInit() {
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;

    var refMasterObjCustModel = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustModel, MappingCode: CommonConstant.CustTypeCompany
    }
    this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, refMasterObjCustModel).subscribe(
      (response) => {
        console.log("Ini DDL");
        console.log(response);
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
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response[CommonConstant.ReturnObj];
        if(this.tempCompanyTypeCode.length > 0){
          this.CustomerCompanyForm.patchValue({
            MrCompanyTypeCode: this.tempCompanyTypeCode[0].Key
          });
        }
      }
    );
    this.custCompanyObj = new CustCompanyObj();
    this.custObj.CustId = this.CustId;
    this.custCompanyObj.CustId = this.CustId;

    this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        console.log(response);
        this.CustomerCompanyForm.patchValue({
          CustName: this.tempCustObj.CustName,
          TaxIdNo: this.tempCustObj.TaxIdNo,
          CustModel : this.tempCustObj.MrCustModelCode,
          MrCustModelCode: this.tempCustObj.MrCustModelCode, 
          IsVip :this.tempCustObj.IsVip,
          IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
          VipNotes :this.tempCustObj.VipNotes,
        });
        this.IsGuarantor = this.tempCustObj.IsGuarantor;
        this.IsFamily = this.tempCustObj.IsFamily;
        this.IsShareholder = this.tempCustObj.IsShareholder;
        this.IsCustomer = this.tempCustObj.IsCustomer;
        if(this.tempCustObj.VipNotes!= null){
          this.VipNotesRequired = true;
        }else{
          this.VipNotesRequired = false;
        }
        if(this.tempCustObj.IsVip==false){ 
        this.CustomerCompanyForm.controls.VipNotes.disable();
        }
        this.custObj.RowVersion = this.tempCustObj.RowVersion;
        this.custObj.MrCustTypeCode = this.tempCustObj.MrCustTypeCode;
        this.CustomerCompanyForm.controls["TaxIdNo"].disable();

        this.http.post(URLConstant.GetCustAddrByMrCustAddrType, { CustId: this.tempCustObj.CustId, MrCustAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
          (response: CustAddrObj) => {
            this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
            this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
            this.UcAddressObj.AreaCode1 = response.AreaCode1;
            this.UcAddressObj.AreaCode2 = response.AreaCode2;
            this.UcAddressObj.AreaCode3 = response.AreaCode3;
            this.UcAddressObj.AreaCode4 = response.AreaCode4;
            this.UcAddressObj.Addr = response.Addr;
            this.UcAddressObj.City = response.City;
            this.inputAddressObj.default = this.UcAddressObj;
            this.inputAddressObj.inputField = this.inputFieldObj;
            this.custObj.CustAddr.CustAddrId = response.CustAddrId;
            this.custObj.CustAddr.RowVersion = response.RowVersion;
          }
        );
      }
    );
    this.http.post(this.getCustCompanyByCustIdUrl, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: this.tempCustCompanyObj.MrCompanyTypeCode
        });
      }
    );
  }

  SaveValue() {
    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custObj.CustName = this.CustomerCompanyForm.controls["CustName"].value;
    this.custObj.TaxIdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.custObj.IdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.custObj.MrCustModelCode = this.CustomerCompanyForm.controls["CustModel"].value;
    this.custCompanyObj.MrCompanyTypeCode = this.CustomerCompanyForm.controls["MrCompanyTypeCode"].value;
    this.custObj.IsVip = this.CustomerCompanyForm.controls["IsVip"].value;
    this.custObj.IsAffiliateWithMf = this.CustomerCompanyForm.controls["IsAffiliateWithMf"].value; 
    this.custObj.IsGuarantor = this.IsGuarantor;
    this.custObj.IsCustomer = this.IsCustomer; 
    this.custObj.IsFamily = this.IsFamily; 
    this.custObj.IsShareholder = this.IsShareholder; 
    if(this.custObj.IsVip==true){
      this.custObj.VipNotes = this.CustomerCompanyForm.controls["VipNotes"].value;
    }else{
      this.custObj.VipNotes = null;
    }

    var formValue = this.CustomerCompanyForm.value;
    this.custObj.CustAddr.CustId = this.CustId;
    this.custObj.CustAddr.Addr = formValue["UcAddress"]["Addr"];
    this.custObj.CustAddr.AreaCode1 = formValue["UcAddress"]["AreaCode1"];
    this.custObj.CustAddr.AreaCode2 = formValue["UcAddress"]["AreaCode2"];
    this.custObj.CustAddr.AreaCode3 = formValue["UcAddress"]["AreaCode3"];
    this.custObj.CustAddr.AreaCode4 = formValue["UcAddress"]["AreaCode4"];
    this.custObj.CustAddr.City = formValue["UcAddress"]["City"];
    this.custObj.CustAddr.Zipcode = formValue["UcAddressZipcode"]["value"];
    this.custObj.CustAddr.SubZipcode = formValue["UcAddressZipcode"]["value"];
    this.custObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

    console.log("tes");
    console.log(this.custObj);
    this.http.post(this.editCustUrl, this.custObj).subscribe(
      (response) => {
        this.http.post(this.editCustCompanyUrl, this.custCompanyObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            if (this.From == "EditMainData") {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_COY_PAGE],{ "IdCust": this.CustId, Page: "Edit", From:'EditMainData' });
            }
            else if(this.From == "CustShareholder"){
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_COY_PAGE],{ "IdCust": this.CustId, Page: "Edit", From:'CustShareholder' });
            }
            else if(this.From == "CustGuarantor"){
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_COY_PAGE],{ "IdCust": this.CustId, Page: "Edit", From:'CustGuarantor' });
            }
            else {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_COY_PAGE],{ "IdCust": this.CustId, From:'CustPaging' });
            }
          }
        );
      }
    );
  }

  back() {
    if (this.From == "CustPaging") {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING],{});
    }
    else if (this.From == "EditMainData") {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING],{});
    }
    else if(this.From == "CustShareholder"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_SHRHLDR_PAGING],{});
    }
    else if(this.From == "CustGuarantor"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_GUARANTOR_PAGING],{});
    }
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
