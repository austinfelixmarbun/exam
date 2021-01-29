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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { environment } from 'environments/environment';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';

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
  closeResult;
  
  IsSupplier: boolean = false;
  tempCustObj: any;
  CustId: number;
  custObj: CustObj;
  tempCoyType :any;
  custCompanyObj: CustCompanyObj;
  tempCustCompanyObj: CustCompanyObj;
  inputLookupObj: InputLookupObj;
  SupplCode: string;
  SupplName: string;
  SupplId: number;
  SupplierObj: any;
  UcAddressObj: UcAddressObj = new UcAddressObj();

  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: [''],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['', [Validators.required]],
    
    IsSupplier: [false],
    SupplCode: [''],
    SupplName: [''],
    SupplId: ['']
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private modalService: NgbModal) {
    this.GetListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.GetListActiveRefMasterWithMappingCodeAllUrl = URLConstant.GetListActiveRefMasterWithMappingCodeAll;
  }

  ngOnInit() {
    this.bindLookupSupplier();
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

  checkIsSupplier() {
    if (this.CustomerCompanyForm.controls.IsSupplier.value === false) {
      this.IsSupplier = true;
    }
    else {
      this.IsSupplier = false;
      
      var refMasterTypeCodeCompanyType = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCompanyType,
        RowVersion: ""
      }
      this.http.post(URLConstant.GetListActiveRefMaster, refMasterTypeCodeCompanyType).subscribe(
        (response) => {
          this.tempCoyType = response[CommonConstant.ReturnObj];
          if (this.tempCoyType.length > 0) {
            this.CustomerCompanyForm.patchValue({
              MrCompanyTypeCode: this.tempCoyType[0].Key
            });
          }
        }
      );
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
      
      this.custCompanyObj = new CustCompanyObj();
      this.custCompanyObj.CustId = this.CustId;
      this.http.post(URLConstant.GetCustByCustId, this.custObj).subscribe(
        (response) => {
          this.tempCustObj = response;
          this.CustomerCompanyForm.patchValue({
            CustName: this.tempCustObj.CustName,
            CustModel: this.tempCustObj.MrCustModelCode,
            TaxIdNo: this.tempCustObj.TaxIdNo,
            IsVip: this.tempCustObj.IsVip,
            IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
            VipNotes: this.tempCustObj.VipNotes,
          });
          if (this.tempCustObj.VipNotes != null) {
            this.VipNotesRequired = true;
          } else {
            this.VipNotesRequired = false;
          }
          if (this.tempCustObj.IsVip == false) {
            this.CustomerCompanyForm.controls.VipNotes.disable();
          }
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
            }
          );
        }
      );
    }
  }

  bindLookupSupplier() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.isReady = false;
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.isReady = true;
  }

  SetSupplier(e) {
    this.CustomerCompanyForm.patchValue({
      SupplCode: e.VendorCode,
      SupplName: e.VendorName,
      SupplId: e.VendorId
    });
    
    this.SupplCode = e.VendorCode;
    this.SupplName = e.VendorName;
    this.SupplId = e.VendorId;

    this.http.post(URLConstant.GetVendorByVendorCode, { VendorCode: e.VendorCode }).subscribe(
      (response) => {
        this.SupplierObj = response;

        this.CustomerCompanyForm.patchValue({
          CustName: this.SupplName,
          TaxIdNo: this.SupplierObj.TaxIdNo,
          CustModel: '',
          IsVip: '',
          IsAffiliateWithMf: '',
          VipNotes: '',
        });
      });

    this.http.post(URLConstant.GetVendorAddrByVendorCodeAndMrAddrTypeCode, { VendorCode: e.VendorCode, MrAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      (response: any) => {
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
    
    AdInsHelper.RedirectUrl(this.router,['/Customer/CustomerCompany/DuplicateCheck'],{ "CustModel": this.CustModel, "CustName": this.CustName, "MrCompanyTypeCode": this.MrCompanyTypeCode, "MrIdTypeCode": this.MrIdTypeCode, "TaxIdNo": this.TaxIdNo, "IsAffiliateWithMf": this.IsAffiliateWithMf, "IsVip": this.IsVip, "VipNotes": this.VipNotes });
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

  //POP UP
  openPopUp(content) {
    this.Open(content);
  }

  Open(contentCrossApp) {
    this.modalService.open(contentCrossApp).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason): string {
    if (reason === 1) {
      return 'by pressing ESC';
    } else if (reason === 0) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
