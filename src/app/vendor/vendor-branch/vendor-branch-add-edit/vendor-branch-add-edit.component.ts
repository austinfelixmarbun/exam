import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Validators, FormBuilder } from '@angular/forms';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { formatDate } from '@angular/common';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorBranchObj } from 'app/shared/model/VendorBranchObj.Model';
import { VendorBranchMainObj } from 'app/shared/model/VendorBranchMainObj.Model';

@Component({
  selector: 'app-vendor-branch-add-edit',
  templateUrl: './vendor-branch-add-edit.component.html',
  styleUrls: ['./vendor-branch-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class VendorBranchAddEditComponent implements OnInit {

  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  itemAssignmentType: any;
  itemCalcMethodType: any;

  result: any;
  check: any;
  inputLookupParentObj: any;
  inputLookupZipcodeObj: any;

  MrVendorCategoryCode: any;
  arrCrit: any;
  mode: string = "add";
  vendorBranchObj: any;
  VendorId: any;
  ButtonLbl: string = "Continue";
  arrCritSuHo: any[];
  arrCritSurHo: any[];
  arrCritAsIn: any[];
  arrCritLiIn: any[];
  arrCritAgP: any[];

  MRSupplierUpCalcMethod: any;
  itemTypeUpCalcMethod: any;
  itemSupplierClass: any;
  itemMaxRefundType: any;
  itemAssignmentTypeTele: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      this.VendorId = params['VendorId'];
      this.mode = params['mode'];
    });
  }

  VendorForm = this.fb.group({
    MrVendorCategoryCode: [{ value: '', disabled: true }],
    VendorCode: ['', Validators.required],
    VendorName: ['', Validators.required],
    MrVendorTypeCode: ['', Validators.required],
    RegistrationNo: ['', Validators.required],
    LicenseNo: ['', Validators.required],
    MrIdTypeCode: [''],
    IdNo: [''],
    MobilePhnNo1: [''],
    MobilePhnNo2: [''],
    Email: ['', Validators.required],
    VendorRating: [{ value: '', disabled: true }],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
    VendorParentId: [''],
    ReservedField2: [''], //Maximum Task load
    ReservedField3: [''],//Supplier calc up method
    ReservedField4: [''], //Supplier Class
    ReservedField5: [''], //BPKBAging
    ReservedField6: [''], //DaysPAfterGolive
    ReservedField7: [''], //MaxRefundType
    ReservedField8: [''], //MaxRefundValue
    ReservedField9: [''], //ASSGMNT_TYPE tele, field
    MrTaxCalcMethodCode: [''],
    IsVat: [true],
    TaxIdNo: ['', Validators.required],
    TaxpayerName: ['', Validators.required],
    MrAddrTypeCode: [''],
    Addr: [''],
    Zipcode: [''],
    AreaCode2: [{ value: '', disabled: true }], //kelurahan
    AreaCode1: [{ value: '', disabled: true }], //kecamatan
    City: [{ value: '', disabled: true }],
    Province: [{ value: '', disabled: true }],
    RowVersionVendor: [''],
    RowVersionVendorAddr: ['']
  })

  ngOnInit() {
    console.log("nih save form")
    var refMasterCategoryObj = {
      RefMasterTypeCode: "VENDOR_CATEGORY"
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterCategoryObj).subscribe(
      (response) => {
        this.itemCategoryType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorCategoryCode: this.MrVendorCategoryCode
        });
      }
    );

    var refMaxRefundType = {
      RefMasterTypeCode: "MAX_REFUND_TYPE"
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMaxRefundType).subscribe(
      (response) => {
        this.itemMaxRefundType = response["ReturnObject"];
        this.VendorForm.patchValue({
          ReservedField7: this.itemMaxRefundType[0].Key
        });
      }
    );

    var refAssignmentType = {
      RefMasterTypeCode: "ASSGMNT_TYPE"
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refAssignmentType).subscribe(
      (response) => {
        this.itemAssignmentTypeTele = response["ReturnObject"];
        this.VendorForm.patchValue({
          ReservedField9: this.itemAssignmentTypeTele[0].Key
        });
      }
    );

    var refMrSupplierClass = {
      RefMasterTypeCode: "SUPPLIER_CLASS"
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMrSupplierClass).subscribe(
      (response) => {
        this.itemSupplierClass = response["ReturnObject"];
        this.VendorForm.patchValue({
          ReservedField4: this.itemSupplierClass[0].Key
        });
      }
    );

    var refMRSupplierUpCalcMethod = {
      RefMasterTypeCode: "SUPPLIER_UP_CALC_METHOD",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMRSupplierUpCalcMethod).subscribe(
      (response) => {
        this.itemTypeUpCalcMethod = response["ReturnObject"];
        this.VendorForm.patchValue({
          ReservedField3: this.itemTypeUpCalcMethod[0].Key
        });
      }
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: "VENDOR_TYPE",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterTypeObj).subscribe(
      (response) => {
        this.itemType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorTypeCode: this.itemType[0].Key
        });
      }
    );

    var refMasterIdObj = {
      RefMasterTypeCode: "ID_TYPE_VENDOR",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrIdTypeCode: this.itemIdType[0].Key
        });
      }
    );

    if (this.MrVendorCategoryCode == "SURVEYOR_HO" || this.MrVendorCategoryCode == "ASSET_INSCO_HO") {
      var refMasterAssignmentObj = {
        RefMasterTypeCode: "TASK_ASSIGNMENT_TYPE",
      }
      this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterAssignmentObj).subscribe(
        (response) => {
          this.itemAssignmentType = response["ReturnObject"];
          this.VendorForm.patchValue({
            ReservedField1: this.itemAssignmentType[0].Key
          });
        }
      );
    }

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: "TAX_CALC_METHOD",
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
        });
      }
    );

    if (this.mode == "edit") {
      this.ButtonLbl = "Submit";
      var vendorObj = new VendorBranchMainObj();
      vendorObj.VendorId = this.VendorId;
      this.VendorForm.controls.VendorCode.disable();
      this.http.post(AdInsConstant.GetVendorBranchAndVendorTaxAddrByVendorId, vendorObj).subscribe(
        (response) => {
          this.setLookup();
          this.result = response;
          this.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
          this.VendorForm.patchValue({
            MrVendorCategoryCode: this.result.VendorObj.MrVendorCategoryCode,
            VendorCode: this.result.VendorObj.VendorCode,
            VendorName: this.result.VendorObj.VendorName,
            MrVendorTypeCode: this.result.VendorObj.MrVendorTypeCode,
            RegistrationNo: this.result.VendorObj.RegistrationNo,
            LicenseNo: this.result.VendorObj.LicenseNo,
            MrIdTypeCode: this.result.VendorObj.MrIdTypeCode,
            IdNo: this.result.VendorObj.IdNo,
            MobilePhnNo1: this.result.VendorObj.MobilePhnNo1,
            MobilePhnNo2: this.result.VendorObj.MobilePhnNo2,
            Email: this.result.VendorObj.Email,
            VendorRating: this.result.VendorObj.VendorRating,
            EstablishmentDt: formatDate(this.result.VendorObj['EstablishmentDt'], 'yyyy-MM-dd', 'en-US'),
            PartnershipDt: formatDate(this.result.VendorObj['PartnershipDt'], 'yyyy-MM-dd', 'en-US'),
            IsActive: this.result.VendorObj.IsActive,
            VendorParentId: this.result.VendorObj.VendorParentId,
            ReservedField2: this.result.VendorObj.ReservedField2,
            ReservedField3: this.result.VendorObj.ReservedField3,
            ReservedField4: this.result.VendorObj.ReservedField4,
            ReservedField5: this.result.VendorObj.ReservedField5,
            ReservedField6: this.result.VendorObj.ReservedField6,
            ReservedField7: this.result.VendorObj.ReservedField7,
            ReservedField8: this.result.VendorObj.ReservedField8,
            ReservedField9: this.result.VendorObj.ReservedField9,
            MrTaxCalcMethodCode: this.result.VendorObj.MrTaxCalcMethodCode,
            IsVat: this.result.VendorObj.IsVat,
            TaxIdNo: this.result.VendorObj.TaxIdNo,
            TaxpayerName: this.result.VendorObj.TaxpayerName,
            RowVersionVendor: this.result.VendorObj.RowVersion,
            MrAddrTypeCode: this.result.VendorObj.MrAddrTypeCode,
            Addr: this.result.VendorAddrObj.Addr,
            AreaCode2: this.result.VendorAddrObj.AreaCode2,
            AreaCode1: this.result.VendorAddrObj.AreaCode1,
            City: this.result.VendorAddrObj.City,
            Province: this.result.VendorAddrObj.Province,
            RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion
          });


          var Parent = new VendorObj();
          Parent.VendorId = this.result.VendorObj.VendorParentId;
          if (this.result.VendorObj.VendorParentId == null) {
            this.inputLookupParentObj.jsonSelect = { VendorName: "" };
          } else {
            this.http.post(AdInsConstant.GetVendorByVendorId, Parent).subscribe(
              (response) => {
                this.inputLookupParentObj.jsonSelect = { VendorName: response["VendorName"] };
              }
            )
          }
          this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.setLookup();
    }
  }

  getLookupParent(event) {
    this.VendorForm.patchValue({
      VendorParentId: event.VendorId
    });
  }

  getLookupZipcode(event) {
    this.VendorForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
  }


  updateValueAndValidityForm() {
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  checkHOType() {
    if (this.VendorForm.controls.MrVendorTypeCode.value == 'C') {
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.updateValueAndValidityForm();
    } else if (this.VendorForm.controls.MrVendorTypeCode.value == 'P') {
      this.VendorForm.controls.RegistrationNo.clearValidators();
      this.VendorForm.controls.LicenseNo.clearValidators();
      this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      this.VendorForm.controls.IdNo.setValidators(Validators.required);
      this.updateValueAndValidityForm();
    }
  }

  setLookup() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    this.inputLookupParentObj = new InputLookupObj();
    this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.isRequired = true;
    this.inputLookupParentObj.addCritInput = new Array();

    this.arrCritSuHo = new Array();
    this.arrCritSurHo = new Array();
    this.arrCritAsIn = new Array();
    this.arrCritLiIn = new Array();
    this.arrCritAgP = new Array();


    if (this.MrVendorCategoryCode == "SUPPLIER_BRANCH") {
      var critInput = new CriteriaObj();
      critInput.propName = "MR_VENDOR_CATEGORY_CODE";
      critInput.restriction = AdInsConstant.RestrictionEq;
      critInput.value = "SUPPLIER_HO";
      this.inputLookupParentObj.addCritInput.push(critInput);

      this.VendorForm.controls.ReservedField3.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField4.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField6.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField7.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField8.setValidators(Validators.required);

      this.UpdateValueAndValidity();
    }
    if (this.MrVendorCategoryCode == "SURVEYOR_BRANCH") {
      var critObjSurveyor = new CriteriaObj();
      critObjSurveyor.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjSurveyor.restriction = AdInsConstant.RestrictionEq;
      critObjSurveyor.value = "SURVEYOR_HO";
      this.inputLookupParentObj.addCritInput.push(critObjSurveyor);

      this.UpdateValueAndValidity();
    }
    if (this.MrVendorCategoryCode == "ASSET_INSCO_BRANCH") {
      var critObjAssetInsurance = new CriteriaObj();
      critObjAssetInsurance.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjAssetInsurance.restriction = AdInsConstant.RestrictionEq;
      critObjAssetInsurance.value = "ASSET_INSCO_HO";
      this.inputLookupParentObj.addCritInput.push(critObjAssetInsurance);
    }
    if (this.MrVendorCategoryCode == "LIFE_INSCO_BRANCH") {
      var critObjLifeInsurance = new CriteriaObj();
      critObjLifeInsurance.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjLifeInsurance.restriction = AdInsConstant.RestrictionEq;
      critObjLifeInsurance.value = "LIFE_INSCO_HO";
      this.inputLookupParentObj.addCritInput.push(critObjLifeInsurance);
    }
    if (this.MrVendorCategoryCode == "AGENCY_PERSONAL") {
      var critObjAgencyPersonal = new CriteriaObj();
      critObjAgencyPersonal.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjAgencyPersonal.restriction = AdInsConstant.RestrictionEq;
      critObjAgencyPersonal.value = "AGENCY_PERSONAL";
      this.inputLookupParentObj.addCritInput.push(critObjAgencyPersonal);
    }
  }

  UpdateValueAndValidity() {
    this.VendorForm.controls.ReservedField3.updateValueAndValidity();
    this.VendorForm.controls.ReservedField4.updateValueAndValidity();
    this.VendorForm.controls.ReservedField6.updateValueAndValidity();
    this.VendorForm.controls.ReservedField7.updateValueAndValidity();
    this.VendorForm.controls.ReservedField8.updateValueAndValidity();
  }
  SaveForm() {
    this.vendorBranchObj = new VendorBranchObj();
    var vendorObj = {
      MrVendorCategoryCode: this.VendorForm.controls.MrVendorCategoryCode.value,
      VendorCode: this.VendorForm.controls.VendorCode.value,
      VendorName: this.VendorForm.controls.VendorName.value,
      MrVendorTypeCode: this.VendorForm.controls.MrVendorTypeCode.value,
      RegistrationNo: this.VendorForm.controls.RegistrationNo.value,
      LicenseNo: this.VendorForm.controls.LicenseNo.value,
      MrIdTypeCode: this.VendorForm.controls.MrIdTypeCode.value,
      IdNo: this.VendorForm.controls.IdNo.value,
      MobilePhnNo1: this.VendorForm.controls.MobilePhnNo1.value,
      MobilePhnNo2: this.VendorForm.controls.MobilePhnNo2.value,
      Email: this.VendorForm.controls.Email.value,
      VendorRating: this.VendorForm.controls.VendorRating.value,
      EstablishmentDt: this.VendorForm.controls.EstablishmentDt.value,
      PartnershipDt: this.VendorForm.controls.PartnershipDt.value,
      IsActive: this.VendorForm.controls.IsActive.value,
      VendorParentId: this.VendorForm.controls.VendorParentId.value,
      ReservedField2: "",
      ReservedField3: "",
      ReservedField4: "",
      ReservedField5: "",
      ReservedField6: "",
      ReservedField7: "",
      ReservedField8: "",
      ReservedField9: "",
      MrTaxCalcMethodCode: this.VendorForm.controls.MrTaxCalcMethodCode.value,
      IsVat: this.VendorForm.controls.IsVat.value,
      TaxIdNo: this.VendorForm.controls.TaxIdNo.value,
      TaxpayerName: this.VendorForm.controls.TaxpayerName.value
    }

    if (vendorObj.MrVendorCategoryCode == "SUPPLIER_BRANCH") {
      vendorObj.ReservedField3 = this.VendorForm.controls.ReservedField3.value;
      vendorObj.ReservedField4 = this.VendorForm.controls.ReservedField4.value;
      vendorObj.ReservedField5 = this.VendorForm.controls.ReservedField5.value;
      vendorObj.ReservedField6 = this.VendorForm.controls.ReservedField6.value;
      vendorObj.ReservedField7 = this.VendorForm.controls.ReservedField7.value;
      vendorObj.ReservedField8 = this.VendorForm.controls.ReservedField8.value;
    }
    if (vendorObj.MrVendorCategoryCode == "SURVEYOR_BRANCH") {
      vendorObj.ReservedField2 = this.VendorForm.controls.ReservedField2.value;
      vendorObj.ReservedField9 = this.VendorForm.controls.ReservedField9.value;
    }

    var vendorAddrObj = {
      MrAddrTypeCode: "TAX",
      Addr: this.VendorForm.controls.Addr.value,
      Zipcode: this.VendorForm.controls["lookupZipcode"]["controls"].value.value,
      AreaCode2: this.VendorForm.controls.AreaCode2.value,
      AreaCode1: this.VendorForm.controls.AreaCode1.value,
      City: this.VendorForm.controls.City.value,
      Province: this.VendorForm.controls.Province.value,
    }

    if (this.mode == "edit") {
      this.vendorBranchObj.VendorObj = vendorObj;
      this.vendorBranchObj.VendorAddrObj = vendorAddrObj;

      this.vendorBranchObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
      this.vendorBranchObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
      this.vendorBranchObj.VendorObj.VendorId = this.VendorId;
      this.vendorBranchObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
      this.vendorBranchObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
      this.vendorBranchObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

      this.http.post(AdInsConstant.EditVendorBranch, this.vendorBranchObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Vendor/Branch/Paging');
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.vendorBranchObj.VendorObj = vendorObj;
      this.vendorBranchObj.VendorAddrObj = vendorAddrObj;
      this.vendorBranchObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

      this.http.post(AdInsConstant.AddVendorBranch, this.vendorBranchObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(['/Vendor/Branch/Registration'], { queryParams: { "VendorId": response['VendorObj'].VendorId } });
        },
        (error) => {
          console.log(error);
        });
    }
  }

  Back(){
    if(this.mode == "edit"){
      this.router.navigate(['/Vendor/Branch/Registration'], { queryParams: { "VendorId": this.VendorId} });
    }else{
      this.router.navigate(['/Vendor/Branch/Paging']);
    }
  }
}
