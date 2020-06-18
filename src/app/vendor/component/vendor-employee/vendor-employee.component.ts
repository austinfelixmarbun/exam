import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VendorBranchEmpObj } from 'app/shared/model/VendorBranchEmpObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorEmpObj } from 'app/shared/model/VendorEmpObj.Model';
import { formatDate } from '@angular/common';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-vendor-employee',
  templateUrl: './vendor-employee.component.html',
  styleUrls: ['./vendor-employee.component.scss']
})
export class VendorEmployeeComponent implements OnInit {
  @Input() objInput: any;
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  VendorEmpId: number;
  VendorId: number;
  MrVendorCategoryCode: string;
  mode: string = "add";
  VendorBranchEmpObj: any = new VendorBranchEmpObj();
  result: any;
  resultVendorEmpAndAddr: any;
  inputLookupInternalEmpObj: any;
  inputLookupSpvObj: any;
  inputLookupZipcodeObj: any;
  VendorPositionList = new Array();
  IdTypeList = new Array();
  itemCalcMethodType: any;
  businessDtMin: Date;

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
    Email: ['', [Validators.required]],
    JoinDt: ['', [Validators.required]],
    VendorEmpRating: ['0'],
    Zipcode: [''],
    Addr: [''],
    AreaCode1: [''],
    AreaCode2: [''],
    City: [''],
    Province: [''],
    IsActive: [false],
    IsContactPerson: [false],
    IsOwner: [false],
    TaxIdNo: [''],
    TaxpayerName: [''],
    MrTaxCalcMethodCode: ['']
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private toastr: NGXToastrService, private wizard: WizardComponent) {
    this.route.queryParams.subscribe(params => {
      if (params["mode"] == "edit") {
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
    var currentUserContext = JSON.parse(localStorage.getItem("UserAccess"));
    this.businessDtMin = new Date(currentUserContext["BusinessDt"]);
    var RefMasterVendorPosition = {
      RefMasterTypeCode: "VENDOR_POSITION",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, RefMasterVendorPosition).subscribe(
      (response) => {
        this.VendorPositionList = response["ReturnObject"];
        if (this.mode != "edit") {
          this.VendorEmpForm.patchValue({
            MrVendorEmpPositionCode: this.VendorPositionList[0].Key
          });
        }
      }
    );
    var RefMasterIdType = {
      RefMasterTypeCode: "ID_TYPE",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, RefMasterIdType).subscribe(
      (response) => {
        this.IdTypeList = response["ReturnObject"];
        if (this.mode != "edit") {
          this.VendorEmpForm.patchValue({
            MrIdTypeCode: this.IdTypeList[0].Key
          });
        }
      }
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: "TAX_CALC_METHOD",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response["ReturnObject"];
        if (this.mode != "edit") {
          this.VendorEmpForm.patchValue({
            MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
          });
        }
      }
    );

    var vendorObj = {
      VendorId: this.objInput.VendorId
    }
    this.http.post(AdInsConstant.GetVendorByVendorId, vendorObj).subscribe(
      (response) => {
        this.result = response;
        this.MrVendorCategoryCode = this.result.MrVendorCategoryCode;
      }
    );

    if (this.mode == "edit") {
      this.VendorEmpForm.controls["VendorEmpCode"].disable();
      this.VendorEmpForm.controls["VendorEmpName"].disable();
      this.getData();
    } else {
      this.setLookup();
    }
  }

  setLookup() {
    this.inputLookupInternalEmpObj = new InputLookupObj();
    this.inputLookupInternalEmpObj.urlJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupInternalEmpObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupInternalEmpObj.pagingJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.genericJson = "./assets/uclookup/vendor/lookupRefEmp.json";
    this.inputLookupInternalEmpObj.isRequired = false;

    this.inputLookupSpvObj = new InputLookupObj();
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

    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    if (this.resultVendorEmpAndAddr != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.resultVendorEmpAndAddr["VendorAddrObj"].Zipcode };
      this.inputLookupSpvObj.jsonSelect = { VendorEmpName: this.resultVendorEmpAndAddr["VendorEmpObj"].SupervisorName };
    }
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

  async getData(){
    var vendorEmpObj = new VendorEmpObj();
    vendorEmpObj.VendorId = null;
    vendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
    this.http.post(AdInsConstant.GetVendorEmpAndVendorTaxAddrByVendorEmpId, vendorEmpObj).subscribe(
      (response) => {
        this.resultVendorEmpAndAddr = response;
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
          MrTaxCalcMethodCode: this.resultVendorEmpAndAddr.VendorEmpObj.MrTaxCalcMethodCode
        });
        this.setLookup();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  SaveForm() {
    var vendorEmpObj = {
      VendorEmpNo: this.VendorEmpForm.controls.VendorEmpCode.value,
      VendorEmpName: this.VendorEmpForm.controls.VendorEmpName.value,
      VendorId: this.objInput.VendorId,
      MobilePhnNo1: this.VendorEmpForm.controls.MobilePhnNo1.value,
      MobilePhnNo2: this.VendorEmpForm.controls.MobilePhnNo2.value,
      Email: this.VendorEmpForm.controls.Email.value,
      MrIdTypeCode: this.VendorEmpForm.controls.MrIdTypeCode.value,
      IdNo: this.VendorEmpForm.controls.IdNo.value,
      BirthPlace: this.VendorEmpForm.controls.BirthPlace.value,
      BirthDate: this.VendorEmpForm.controls.BirthDate.value,
      IsActive: this.VendorEmpForm.controls.IsActive.value,
      JoinDt: this.VendorEmpForm.controls.JoinDt.value,
      TaxIdNo: this.VendorEmpForm.controls.TaxIdNo.value,
      TaxpayerName: this.VendorEmpForm.controls.TaxpayerName.value,
      MrVendorEmpPositionCode: this.VendorEmpForm.controls.MrVendorEmpPositionCode.value,
      IsContactPerson: this.VendorEmpForm.controls.IsContactPerson.value,
      VendorEmpRating: this.VendorEmpForm.controls.VendorEmpRating.value,
      RowVersion: "",
      SupervisorId: this.VendorBranchEmpObj.VendorEmpObj.SupervisorId,
      MrTaxCalcMethodCode: this.VendorEmpForm.controls.MrTaxCalcMethodCode.value
    };

    var vendorAddrObj = { 
      MrAddrTypeCode: "TAX",
      Zipcode: this.VendorBranchEmpObj.VendorAddrObj.Zipcode,
      Addr: this.VendorEmpForm.controls.Addr.value,
      AreaCode2: this.VendorEmpForm.controls.AreaCode2.value,
      AreaCode1: this.VendorEmpForm.controls.AreaCode1.value,
      City: this.VendorEmpForm.controls.City.value,
      Province: this.VendorEmpForm.controls.Province.value,
      RowVersion: ""
    };

    this.VendorBranchEmpObj.VendorEmpObj = vendorEmpObj;
    this.VendorBranchEmpObj.VendorAddrObj = vendorAddrObj;

    if (this.mode == "add") {
      this.http.post(AdInsConstant.AddVendorBranchEmp, this.VendorBranchEmpObj).subscribe(
        (response) => {
          this.mode = "edit";
          this.getData();
          this.objOutput.emit(response["VendorEmpId"]);
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
        },
        (error) => {
          console.log(error);
        });
    } else {
      this.VendorBranchEmpObj.VendorEmpObj.VendorEmpId = this.objInput.VendorEmpId;
      this.VendorBranchEmpObj.VendorAddrObj.VendorAddrId = this.resultVendorEmpAndAddr.VendorAddrObj.VendorAddrId;
      this.VendorBranchEmpObj.VendorEmpObj.RowVersion = this.resultVendorEmpAndAddr.VendorEmpObj.RowVersion;
      this.VendorBranchEmpObj.VendorAddrObj.RowVersion = this.resultVendorEmpAndAddr.VendorAddrObj.RowVersion;
      this.VendorBranchEmpObj.VendorEmpObj.TaxpayerNo = this.resultVendorEmpAndAddr.VendorEmpObj.TaxpayerNo;

      this.http.post(AdInsConstant.EditVendorBranchEmp, this.VendorBranchEmpObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
          this.getData();
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
