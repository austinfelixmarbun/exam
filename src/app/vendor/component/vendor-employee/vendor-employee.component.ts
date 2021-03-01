import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VendorBranchEmpObj } from 'app/shared/model/VendorBranchEmpObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorEmpObj } from 'app/shared/model/VendorEmpObj.Model';
import { formatDate } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-vendor-employee',
  templateUrl: './vendor-employee.component.html'
})
export class VendorEmployeeComponent implements OnInit {
  @Input() objInput: any;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  VendorEmpId: number;
  VendorId: number;
  MrVendorCategoryCode: string;
  mode: string;
  VendorBranchEmpObj: VendorBranchEmpObj = new VendorBranchEmpObj();
  result: any;
  resultVendorEmpAndAddr: any;
  inputLookupInternalEmpObj: InputLookupObj = new InputLookupObj();
  inputLookupSpvObj: InputLookupObj = new InputLookupObj();
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj();
  VendorPositionList = new Array();
  IdTypeList = new Array();
  itemCalcMethodType: any;
  businessDtMin: Date;

  isHidden: boolean = true;

  VendorEmpForm = this.fb.group({
    VendorEmpCode: ['', [Validators.required]],
    VendorEmpName: ['', [Validators.required]],
    MrVendorEmpPositionCode: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    BirthPlace: [''],
    BirthDate: [''],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    JoinDt: ['', [Validators.required]],
    VendorEmpRating: ['0'],
    Addr: [''],
    AreaCode1: [''],
    AreaCode2: [''],
    City: [''],
    Province: [''],
    IsActive: [false],
    IsContactPerson: [false],
    IsOwner: [false],
    TaxIdNo: ['', [Validators.pattern("^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\.[0-9]{1}\-[0-9]{3}\.[0-9]{3}$")]],
    TaxpayerName: [''],
    MrTaxCalcMethodCode: [''],
    IsNpwpExist: [false]
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private toastr: NGXToastrService, private wizard: WizardComponent, private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.mode = params["mode"];
      }
      if (params["VendorEmpId"] != null) {
        this.VendorEmpId = params["VendorEmpId"];
        this.mode = "edit";
      }
      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }
      if (params["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      }
    });
  }

  ngOnInit() {
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(currentUserContext[CommonConstant.BUSINESS_DT]);

    if (this.mode == undefined) {
      this.mode = this.objInput.mode;
    }

    if (this.mode == "edit") {
      this.VendorEmpForm.controls["VendorEmpCode"].disable();
      this.VendorEmpForm.controls["VendorEmpName"].disable();
      this.setLookup();
      this.getData();
    } else {
      this.mode = "add";
      this.setDropdown();
      this.inputLookupInternalEmpObj.isReady = true;
      this.inputLookupSpvObj.isReady = true;
      this.inputLookupZipcodeObj.isReady = true;
      this.setLookup();
    }
  }

  setDropdown() {
    var RefMasterVendorPosition = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorPosition,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, RefMasterVendorPosition).subscribe(
      (response) => {
        this.VendorPositionList = response[CommonConstant.ReturnObj];
        if (this.VendorPositionList.length > 0) {
          if (this.mode != "edit") {
            this.VendorEmpForm.patchValue({
              MrVendorEmpPositionCode: this.VendorPositionList[0].Key
            });
          }
        }
      }
    );
    var RefMasterIdType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, RefMasterIdType).subscribe(
      (response) => {
        this.IdTypeList = response[CommonConstant.ReturnObj];
        if (this.IdTypeList.length > 0) {
          if (this.mode != "edit") {
            this.VendorEmpForm.patchValue({
              MrIdTypeCode: this.IdTypeList[0].Key
            });
          }
        }
      }
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaxCalcMethod,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response[CommonConstant.ReturnObj];
        if (this.itemCalcMethodType.length > 0) {
          if (this.mode != "edit") {
            this.VendorEmpForm.patchValue({
              MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
            });
          }
        }
      }
    );

    var vendorObj = {
      VendorId: this.objInput.VendorId
    }
    this.http.post(URLConstant.GetVendorByVendorId, vendorObj).subscribe(
      (response) => {
        this.result = response;
        this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
      }
    );
  }

  setLookup() {
    this.inputLookupInternalEmpObj.urlJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupInternalEmpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupInternalEmpObj.pagingJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.genericJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.isRequired = false;

    this.inputLookupSpvObj.urlJson = "./assets/uclookup/vendor/lookupVendorEmp.json";
    this.inputLookupSpvObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupSpvObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupSpvObj.pagingJson = "./assets/uclookup/vendor/lookupVendorEmp.json";
    this.inputLookupSpvObj.genericJson = "./assets/uclookup/vendor/lookupVendorEmp.json";
    this.inputLookupSpvObj.isRequired = false;
    this.inputLookupSpvObj.addCritInput = new Array();

    var critObj = new CriteriaObj();
    critObj.propName = 'VENDOR_ID';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.objInput.VendorId;
    this.inputLookupSpvObj.addCritInput.push(critObj);

    if (this.mode == "edit") {
      var critObj = new CriteriaObj();
      critObj.propName = 'VENDOR_EMP_ID';
      critObj.restriction = AdInsConstant.RestrictionNeq;
      critObj.value = this.VendorEmpId + '';
      this.inputLookupSpvObj.addCritInput.push(critObj);
    }
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    if (this.resultVendorEmpAndAddr != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.resultVendorEmpAndAddr["VendorAddrObj"].Zipcode };
      this.inputLookupSpvObj.jsonSelect = { VendorEmpName: this.resultVendorEmpAndAddr["VendorEmpObj"].SupervisorName };
    }
    this.NpwpCheck(true);
  }

  getLookupInternal(ev) {
    this.VendorEmpForm.patchValue(
      {
        VendorEmpCode: ev.EmpNo,
        VendorEmpName: ev.EmpName,
      });
    this.VendorEmpForm.controls["VendorEmpCode"].disable();
    this.VendorEmpForm.controls["VendorEmpName"].disable();
  }

  getLookupSupervisor(ev) {
    this.VendorBranchEmpObj.VendorEmpObj.SupervisorId = ev.VendorEmpId;
  }

  getLookupZipcode(ev) {
    this.VendorBranchEmpObj.VendorAddrObj.Zipcode = ev.Zipcode;
    this.VendorEmpForm.patchValue(
      {
        AreaCode2: ev.AreaCode2,
        AreaCode1: ev.AreaCode1,
        PhnArea1: ev.PhnArea,
        City: ev.City,
        Province: ev.Province
      });
    this.inputLookupZipcodeObj.jsonSelect = { Zipcode: ev.Zipcode };
  }

  getData() {
    var vendorEmpObj = new VendorEmpObj();
    vendorEmpObj.VendorId = null;
    vendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
    this.http.post(URLConstant.GetVendorEmpAndVendorTaxAddrByVendorEmpId, vendorEmpObj).subscribe(
      (response) => {
        this.resultVendorEmpAndAddr = response;
        this.setDropdown();
        this.inputLookupInternalEmpObj.isReady = true;
        this.inputLookupSpvObj.isReady = true;
        this.inputLookupZipcodeObj.isReady = true;
        this.VendorBranchEmpObj.VendorEmpObj.SupervisorId = this.resultVendorEmpAndAddr.VendorEmpObj.SupervisorId;
        this.VendorBranchEmpObj.VendorAddrObj.Zipcode = this.resultVendorEmpAndAddr.VendorAddrObj.Zipcode;
        this.VendorEmpForm.patchValue({
          VendorEmpCode: this.resultVendorEmpAndAddr.VendorEmpObj.VendorEmpNo,
          VendorEmpName: this.resultVendorEmpAndAddr.VendorEmpObj.VendorEmpName,
          SupervisorId: this.resultVendorEmpAndAddr.VendorEmpObj.SupervisorId,
          MrVendorEmpPositionCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrVendorEmpPositionCode,
          MrIdTypeCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrIdTypeCode,
          IdNo: this.resultVendorEmpAndAddr.VendorEmpObj.IdNo,
          BirthPlace: this.resultVendorEmpAndAddr.VendorEmpObj.BirthPlace,
          BirthDate: formatDate(this.resultVendorEmpAndAddr.VendorEmpObj['BirthDate'], 'yyyy-MM-dd', 'en-US'),
          MobilePhnNo1: this.resultVendorEmpAndAddr.VendorEmpObj.MobilePhnNo1,
          MobilePhnNo2: this.resultVendorEmpAndAddr.VendorEmpObj.MobilePhnNo2,
          Email: this.resultVendorEmpAndAddr.VendorEmpObj.Email,
          JoinDt: formatDate(this.resultVendorEmpAndAddr.VendorEmpObj['JoinDt'], 'yyyy-MM-dd', 'en-US'),
          VendorEmpRating: this.resultVendorEmpAndAddr.VendorEmpObj.VendorEmpRating,
          Addr: this.resultVendorEmpAndAddr.VendorAddrObj.Addr,
          AreaCode1: this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode1,
          AreaCode2: this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode2,
          City: this.resultVendorEmpAndAddr.VendorAddrObj.City,
          Province: this.resultVendorEmpAndAddr.VendorAddrObj.Province,
          IsActive: this.resultVendorEmpAndAddr.VendorEmpObj.IsActive,
          IsContactPerson: this.resultVendorEmpAndAddr.VendorEmpObj.IsContactPerson,
          IsOwner: this.resultVendorEmpAndAddr.VendorEmpObj.IsOwner,
          TaxIdNo: this.resultVendorEmpAndAddr.VendorEmpObj.TaxIdNo,
          TaxpayerName: this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerName,
          MrTaxCalcMethodCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrTaxCalcMethodCode,
          IsNpwpExist: this.resultVendorEmpAndAddr.VendorEmpObj.IsNpwpExist
        });
        this.setLookup();
      }
    );
  }

  NpwpCheck(isGetData: boolean = false) {
    if (this.VendorEmpForm.controls.IsNpwpExist.value == true) {
      this.isHidden = false;
      this.inputLookupZipcodeObj.isRequired = true;
    } else {
      this.inputLookupZipcodeObj.isRequired = false;
      if (!isGetData) this.VendorEmpForm.controls['Zipcode']['controls'].value.updateValueAndValidity();
      this.isHidden = true;
    }
  }

  SaveForm() {
    var joinDt = new Date(this.VendorEmpForm.controls.JoinDt.value);
    joinDt.setHours(0, 0, 0, 0);
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    var businessDt = new Date(currentUserContext[CommonConstant.BUSINESS_DT]);
    businessDt.setHours(0, 0, 0, 0);
    if (joinDt > businessDt) {
      this.toastr.warningMessage("Join Date Cannot Exceed Business Date");
      return false;
    }
    this.VendorBranchEmpObj.VendorEmpObj.VendorEmpNo = this.VendorEmpForm.controls.VendorEmpCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.VendorEmpName = this.VendorEmpForm.controls.VendorEmpName.value;
    this.VendorBranchEmpObj.VendorEmpObj.VendorId = this.objInput.VendorId;
    this.VendorBranchEmpObj.VendorEmpObj.MobilePhnNo1 = this.VendorEmpForm.controls.MobilePhnNo1.value;
    this.VendorBranchEmpObj.VendorEmpObj.MobilePhnNo2 = this.VendorEmpForm.controls.MobilePhnNo2.value;
    this.VendorBranchEmpObj.VendorEmpObj.Email = this.VendorEmpForm.controls.Email.value;
    this.VendorBranchEmpObj.VendorEmpObj.MrIdTypeCode = this.VendorEmpForm.controls.MrIdTypeCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.IdNo = this.VendorEmpForm.controls.IdNo.value;
    this.VendorBranchEmpObj.VendorEmpObj.BirthPlace = this.VendorEmpForm.controls.BirthPlace.value;
    this.VendorBranchEmpObj.VendorEmpObj.BirthDate = this.VendorEmpForm.controls.BirthDate.value;
    this.VendorBranchEmpObj.VendorEmpObj.IsActive = this.VendorEmpForm.controls.IsActive.value;
    this.VendorBranchEmpObj.VendorEmpObj.JoinDt = this.VendorEmpForm.controls.JoinDt.value;
    this.VendorBranchEmpObj.VendorEmpObj.MrVendorEmpPositionCode = this.VendorEmpForm.controls.MrVendorEmpPositionCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.IsContactPerson = this.VendorEmpForm.controls.IsContactPerson.value;
    this.VendorBranchEmpObj.VendorEmpObj.VendorEmpRating = this.VendorEmpForm.controls.VendorEmpRating.value;
    this.VendorBranchEmpObj.VendorEmpObj.RowVersion = "";
    this.VendorBranchEmpObj.VendorEmpObj.MrTaxCalcMethodCode = this.VendorEmpForm.controls.MrTaxCalcMethodCode.value;
    this.VendorBranchEmpObj.VendorEmpObj.IsNpwpExist = this.VendorEmpForm.controls.IsNpwpExist.value;
    this.VendorBranchEmpObj.VendorEmpObj.SupervisorId = this.VendorBranchEmpObj.VendorEmpObj.SupervisorId;

    if (this.VendorEmpForm.controls.IsNpwpExist.value == true) {
      this.VendorBranchEmpObj.VendorEmpObj.TaxIdNo = this.VendorEmpForm.controls.TaxIdNo.value;
      this.VendorBranchEmpObj.VendorEmpObj.TaxpayerName = this.VendorEmpForm.controls.TaxpayerName.value;

      this.VendorBranchEmpObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.VendorBranchEmpObj.VendorAddrObj.Zipcode = this.VendorBranchEmpObj.VendorAddrObj.Zipcode;
      this.VendorBranchEmpObj.VendorAddrObj.Addr = this.VendorEmpForm.controls.Addr.value;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode2 = this.VendorEmpForm.controls.AreaCode2.value;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode1 = this.VendorEmpForm.controls.AreaCode1.value;
      this.VendorBranchEmpObj.VendorAddrObj.City = this.VendorEmpForm.controls.City.value;
      this.VendorBranchEmpObj.VendorAddrObj.Province = this.VendorEmpForm.controls.Province.value;
      this.VendorBranchEmpObj.VendorAddrObj.RowVersion = "";
    } else if (this.resultVendorEmpAndAddr != null) {
      this.VendorBranchEmpObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.VendorBranchEmpObj.VendorAddrObj.Addr = this.resultVendorEmpAndAddr.VendorAddrObj.Addr;
      this.VendorBranchEmpObj.VendorAddrObj.Zipcode = this.resultVendorEmpAndAddr.VendorAddrObj.Zipcode;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode2 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode2;
      this.VendorBranchEmpObj.VendorAddrObj.AreaCode1 = this.resultVendorEmpAndAddr.VendorAddrObj.AreaCode1;
      this.VendorBranchEmpObj.VendorAddrObj.City = this.resultVendorEmpAndAddr.VendorAddrObj.City;
      this.VendorBranchEmpObj.VendorAddrObj.Province = this.resultVendorEmpAndAddr.VendorAddrObj.Province;
    }

    if (this.mode == "add") {
      this.http.post(URLConstant.AddVendorBranchEmp, this.VendorBranchEmpObj).subscribe(
        (response) => {
          this.mode = "edit";
          this.objInput.VendorEmpId = response["VendorEmpId"];
          this.objOutput.emit(response["VendorEmpId"]);
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
        });
    } else {
      this.VendorBranchEmpObj.VendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
      this.VendorBranchEmpObj.VendorAddrObj.VendorAddrId = this.resultVendorEmpAndAddr.VendorAddrObj.VendorAddrId;
      this.VendorBranchEmpObj.VendorEmpObj.RowVersion = this.resultVendorEmpAndAddr.VendorEmpObj.RowVersion;
      this.VendorBranchEmpObj.VendorAddrObj.RowVersion = this.resultVendorEmpAndAddr.VendorAddrObj.RowVersion;
      this.VendorBranchEmpObj.VendorEmpObj.TaxpayerNo = this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerNo;

      this.http.post(URLConstant.EditVendorBranchEmp, this.VendorBranchEmpObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
        });
    }
  }
}
