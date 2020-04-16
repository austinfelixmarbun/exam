import { Component, OnInit } from '@angular/core';
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

  VendorEmpId: string;
  VendorId: string;
  MrVendorCategoryCode: string;
  mode: string = "add";
  VendorBranchEmpObj: any;
  result: any;
  inputLookupInternalEmpObj: any;
  inputLookupSpvObj: any;
  inputLookupZipcodeObj: any;
  VendorPositionList = new Array();
  IdTypeList = new Array();

  VendorEmpForm = this.fb.group({
    VendorEmpCode: ['', [Validators.required]],
    VendorEmpName: ['', [Validators.required]],
    SupervisorId: [''],
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
    TaxpayerName: ['']
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private toastr: NGXToastrService, private wizard: WizardComponent) {
    this.route.queryParams.subscribe(params => {
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
    this.setUcLookupGeneric();

    var RefMasterVendorPosition = {
      RefMasterTypeCode: "VENDOR_POSITION",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, RefMasterVendorPosition).subscribe(
      (response) => {
        this.VendorPositionList = response["ReturnObject"];
        if (this.mode == "edit") {
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
        if (this.mode == "edit") {
          this.VendorEmpForm.patchValue({
            MrIdTypeCode: this.IdTypeList[0].Key
          });
        }
      }
    );

    if (this.mode == "edit") {
      this.VendorEmpForm.controls["VendorEmpCode"].disable();
      this.VendorEmpForm.controls["VendorEmpName"].disable();
      var vendorEmpObj = new VendorEmpObj();
      vendorEmpObj.VendorEmpId = this.VendorEmpId;
      this.http.post(AdInsConstant.GetVendorEmpAndVendorTaxAddrByVendorEmpId, vendorEmpObj).subscribe(
        (response) => {
          this.result = response;
          this.VendorEmpForm.patchValue({
            VendorEmpCode: this.result.VendorEmpObj.VendorEmpNo,
            VendorEmpName: this.result.VendorEmpObj.VendorEmpName,
            SupervisorId: this.result.VendorEmpObj.SupervisorId,
            MrVendorEmpPositionCode: this.result.VendorEmpObj.MrVendorEmpPositionCode,
            MrIdTypeCode: this.result.VendorEmpObj.MrIdTypeCode,
            IdNo: this.result.VendorEmpObj.IdNo,
            BirthPlace: this.result.VendorEmpObj.BirthPlace,
            BirthDate: formatDate(this.result.VendorEmpObj['BirthDate'], 'yyyy-MM-dd', 'en-US'),
            MobilePhnNo1: this.result.VendorEmpObj.MobilePhnNo1,
            MobilePhnNo2: this.result.VendorEmpObj.MobilePhnNo2,
            Email: this.result.VendorEmpObj.Email,
            JoinDt: formatDate(this.result.VendorEmpObj['JoinDt'], 'yyyy-MM-dd', 'en-US'),
            VendorEmpRating: this.result.VendorEmpObj.VendorEmpRating,
            Zipcode: this.result.VendorEmpObj.Zipcode,
            Addr: this.result.VendorAddrObj.Addr,
            AreaCode1: this.result.VendorAddrObj.AreaCode1,
            AreaCode2: this.result.VendorAddrObj.AreaCode2,
            City: this.result.VendorAddrObj.City,
            Province: this.result.VendorAddrObj.Province,
            IsActive: this.result.VendorEmpObj.IsActive,
            IsContactPerson: this.result.VendorEmpObj.IsContactPerson,
            IsOwner: this.result.VendorEmpObj.IsOwner,
            TaxIdNo: this.result.VendorEmpObj.TaxIdNo,
            TaxpayerName: this.result.VendorEmpObj.TaxpayerName,
          });
          this.inputLookupZipcodeObj.nameSelect = this.result["VendorAddrObj"].Zipcode;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  setUcLookupGeneric() {
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

    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";
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
    this.VendorEmpForm.patchValue({
      SupervisorId: ev.VendorId
    });
  }

  getLookupZipcode(ev) {
    this.VendorEmpForm.patchValue(
      {
        Zipcode: ev.Zipcode,
        AreaCode2: ev.AreaCode2,
        AreaCode1: ev.AreaCode1,
        PhnArea1: ev.PhnArea,
        City: ev.City,
        Province: ev.Province
      });
    this.inputLookupZipcodeObj.nameSelect = ev.Zipcode;
    this.inputLookupZipcodeObj.idSelect = ev.Zipcode;
  }

  SaveForm() {
    this.VendorBranchEmpObj = new VendorBranchEmpObj();
    var vendorEmpObj = {
      VendorEmpNo: this.VendorEmpForm.controls.VendorEmpCode.value,
      VendorEmpName: this.VendorEmpForm.controls.VendorEmpName.value,
      VendorId: this.VendorId,
      SupervisorId: this.VendorEmpForm.controls.SupervisorId.value,
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
      TaxpayerNo: "",
      MrVendorEmpPositionCode: this.VendorEmpForm.controls.MrVendorEmpPositionCode.value,
      IsContactPerson: this.VendorEmpForm.controls.IsContactPerson.value,
      VendorEmpRating: this.VendorEmpForm.controls.VendorEmpRating.value,
      RowVersion: "",
    };

    var vendorAddrObj = {
      MrAddrTypeCode: "TAX",
      Addr: this.VendorEmpForm.controls.Addr.value,
      Zipcode: this.VendorEmpForm.controls.Zipcode.value,
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
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
        },
        (error) => {
          console.log(error);
        });
    } else {
      this.VendorBranchEmpObj.VendorEmpObj.VendorEmpId = this.VendorEmpId;
      this.VendorBranchEmpObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
      this.VendorBranchEmpObj.VendorEmpObj.RowVersion = this.result.VendorEmpObj.RowVersion;
      this.VendorBranchEmpObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

      this.http.post(AdInsConstant.EditVendorBranchEmp, this.VendorBranchEmpObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.wizard.goToNextStep();
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
