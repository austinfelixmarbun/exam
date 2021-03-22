import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { DatePipe } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-edit-main-data-personal',
  templateUrl: './edit-main-data-personal.component.html',
  providers: [NGXToastrService]
})
export class EditMainDataPersonalComponent implements OnInit {
  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    IdExpiredDt: [''],
    MrMaritalStatCode: [''],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    CustModel: ['', [Validators.required]],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['']
  });
  KTP = RefMasterConstant.EKtp;
  getListActiveRefMasterUrl: string;
  tempKTPCheck: any;
  tempGender: any;
  tempIdType: any;
  tempCustModel: any;
  editCustUrl: any;
  editCustPersonalUrl: string;
  getCustPersonalByCustIdUrl: string;
  getCustByCustIdUrl: string;
  GetListActiveRefMasterWithMappingCodeAllUrl  :string;
  tempCustPersonalObj: CustPersonalObj;
  tempCustObj: any;
  CustId: number;
  custObj: CustObj = new CustObj();
  custPersonalObj: CustPersonalObj;
  tempMrMaritalStatCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  From:string;
  businessDtMin : any;
  businessDtMax: any;
  VipNotesRequired : boolean;
  inputFieldObj: InputFieldObj;
  inputAddressObj: InputAddressObj;
  UcAddressObj: UcAddressObj = new UcAddressObj();

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,private toastr: NGXToastrService, private cookieService: CookieService) {
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.getCustPersonalByCustIdUrl = URLConstant.GetCustPersonalbyCustId;
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.editCustUrl = URLConstant.EditCust;
    this.editCustPersonalUrl = URLConstant.EditCustPersonal; 
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

  async ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);

    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;
  
    var refMasterObjGender = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjGender).subscribe(
      (response) => {
        this.tempGender = response[CommonConstant.ReturnObj];
        if(this.tempGender.length > 0){
          this.CustomerPersonalForm.patchValue({
            Gender: this.tempGender[0].Key
          });
        }
      }
    );
    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response[CommonConstant.ReturnObj];
        if(this.tempIdType.length > 0){
          this.CustomerPersonalForm.patchValue({
            MrIdTypeCode: this.tempIdType[0].Key
          });
          this.onChangeIdType();
        }
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        } else {
          this.tempKTPCheck = false;
        }
      }
    );
    var refMasterObjCustModel = {
      MrCustTypeCode: CommonConstant.CustTypePersonal
    }
    this.http.post(URLConstant.GetListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );
    this.custPersonalObj = new CustPersonalObj();
    this.custObj.CustId = this.CustId;
    this.custPersonalObj.CustId = this.CustId;
    var datePipe = new DatePipe("en-US");
    this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        this.CustomerPersonalForm.patchValue({
          CustName: this.tempCustObj.CustName,
          MrCustTypeCode: this.tempCustObj.MrCustTypeCode,
          CustModel: this.tempCustObj.MrCustModelCode,
          MrIdTypeCode: this.tempCustObj.MrIdTypeCode,
          IdNo: this.tempCustObj.IdNo,
          IdExpiredDt: datePipe.transform(this.tempCustObj.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.tempCustObj.TaxIdNo,
          IsVip: this.tempCustObj.IsVip,
          IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
          VipNotes: this.tempCustObj.VipNotes,
        });
        this.custObj.IsGuarantor = this.tempCustObj.IsGuarantor;
        this.custObj.IsCustomer = this.tempCustObj.IsCustomer;
        this.custObj.IsShareholder = this.tempCustObj.IsShareholder;
        this.custObj.IsFamily = this.tempCustObj.IsFamily;
        this.onChangeIdType();
        if (this.tempCustObj.VipNotes != null) {
          this.VipNotesRequired = true;
        } else {
          this.VipNotesRequired = false;
        }
        if (this.tempCustObj.IsVip == false) {
          this.CustomerPersonalForm.controls.VipNotes.disable();
        }
        
        this.custObj.RowVersion = this.tempCustObj.RowVersion;
        this.custObj.MrCustTypeCode = this.tempCustObj.MrCustTypeCode;

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
    await this.http.post<CustPersonalObj>(this.getCustPersonalByCustIdUrl, this.custPersonalObj).toPromise().then(
      (response) => {
        this.tempCustPersonalObj = response;
        this.CustomerPersonalForm.patchValue({
          Gender: this.tempCustPersonalObj.MrGenderCode,
          BirthPlace: this.tempCustPersonalObj.BirthPlace,
          BirthDt: datePipe.transform(this.tempCustPersonalObj.BirthDt, 'yyyy-MM-dd'),
          MotherMaidenName: this.tempCustPersonalObj.MotherMaidenName,
          IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace,
          MrMaritalStatCode: this.tempCustPersonalObj.MrMaritalStatCode,
        });
      }
    );
    await this.http.post(this.getListActiveRefMasterUrl, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat}).toPromise().then(
      (response) => {
        this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
        if (this.tempCustPersonalObj.MrMaritalStatCode != null) {
          this.CustomerPersonalForm.patchValue({
            MrMaritalStatCode: this.tempCustPersonalObj.MrMaritalStatCode
          });
        } else {
          this.CustomerPersonalForm.patchValue({
            MrMaritalStatCode: response[CommonConstant.ReturnObj][0]['Key']
          });
        }
      }
    );
  }
  SaveValue() {
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj = this.tempCustPersonalObj;
    this.custObj.CustName = this.CustomerPersonalForm.controls["CustName"].value;
    this.custObj.MrCustModelCode = this.CustomerPersonalForm.controls["CustModel"].value;
    this.custObj.MrIdTypeCode = this.CustomerPersonalForm.controls["MrIdTypeCode"].value;
    this.custObj.IdNo = this.CustomerPersonalForm.controls["IdNo"].value;
    this.custObj.IdExpiredDt = this.CustomerPersonalForm.controls["IdExpiredDt"].value;;
    this.custObj.TaxIdNo = this.CustomerPersonalForm.controls["TaxIdNo"].value;
    this.custObj.IsVip = this.CustomerPersonalForm.controls["IsVip"].value;
    this.custObj.IsAffiliateWithMf = this.CustomerPersonalForm.controls["IsAffiliateWithMf"].value; 
    if(this.custObj.IsVip==true){
      this.custObj.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
    }else{
      this.custObj.VipNotes = null;
    }

    this.custPersonalObj.CustFullName = this.CustomerPersonalForm.controls["CustName"].value;
    this.custPersonalObj.MrGenderCode = this.CustomerPersonalForm.controls["Gender"].value;
    this.custPersonalObj.BirthPlace = this.CustomerPersonalForm.controls["BirthPlace"].value;
    this.custPersonalObj.BirthDt = this.CustomerPersonalForm.controls["BirthDt"].value;
    this.custPersonalObj.MotherMaidenName = this.CustomerPersonalForm.controls["MotherMaidenName"].value;
    this.custPersonalObj.MrMaritalStatCode = this.CustomerPersonalForm.controls["MrMaritalStatCode"].value;

    var formValue = this.CustomerPersonalForm.value;
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
    this.http.post(this.editCustUrl, this.custObj).subscribe(
      (response) => {
        this.http.post(this.editCustPersonalUrl, this.custPersonalObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            
            if (this.From == "EditMainData") {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.CustId, Page: 'Edit', From: 'EditMainData' });
            }
            else if(this.From == "CustFamily"){
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.CustId, Page: 'Edit', From: 'CustFamily' });
            }
            else if(this.From == "CustShareholder"){
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.CustId, Page: 'Edit', From: 'CustShareholder' });
            }
            else if(this.From == "CustGuarantor"){
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.CustId, Page: 'Edit', From: 'CustGuarantor' });
            }
            else {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PERSONAL_PAGE],{ "IdCust": this.CustId, From: 'CustPaging' });
            } 
          }
        );
      }
    );
  }
  onOptionsSelected(event) {
    if (event.target.value == this.KTP) {
      this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck = true;
    } else {
      this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();
    this.onChangeIdType();
  }	

  onChangeIdType() {
    let idType: string = this.CustomerPersonalForm.get("MrIdTypeCode").value;

    this.CustomerPersonalForm.get("IdNo").clearValidators();
    if (idType == CommonConstant.MrIdTypeCodeEKTP) {
      this.CustomerPersonalForm.get("IdNo").setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      this.CustomerPersonalForm.get("IdNo").setValidators([Validators.required]);
    }
    this.CustomerPersonalForm.get("IdNo").updateValueAndValidity();
  }

  back(){
    if(this.From =="CustPaging"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING],{});
    }
    else if(this.From == "EditMainData"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING],{});
    }
    else if(this.From == "CustFamily"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_FAMILY_PAGING],{});
    }
    else if(this.From == "CustShareholder"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_SHRHLDR_PAGING],{});
    }
    else if(this.From == "CustGuarantor"){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_GUARANTOR_PAGING],{});
    }
}
checkState() {
  if (this.CustomerPersonalForm.controls.IsVip.value === true) {
    this.CustomerPersonalForm.patchValue({
      VipNotes: null
    });
    this.CustomerPersonalForm.controls.VipNotes.disable();
    this.VipNotesRequired = false;
    this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();
     
  } else {
    this.CustomerPersonalForm.controls.VipNotes.enable();
    this.CustomerPersonalForm.controls.VipNotes.setValidators(Validators.required);
    this.VipNotesRequired = true;
  }
  this.CustomerPersonalForm.controls.VipNotes.updateValueAndValidity();
}
}