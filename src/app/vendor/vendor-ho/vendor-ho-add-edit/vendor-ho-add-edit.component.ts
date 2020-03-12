import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-vendor-ho-add-edit',
  templateUrl: './vendor-ho-add-edit.component.html',
  styleUrls: ['./vendor-ho-add-edit.component.scss'],
  providers: [NGXToastrService]
})
export class VendorHoAddEditComponent implements OnInit {
  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  itemAssignmentType: any;
  itemCalcMethodType: any;

  check: any;
  inputLookupParentObj: any;
  inputLookupZipcodeObj: any;
  MrVendorCategoryCode: any;
  arrCrit:any;
  mode: any;
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) { 
    this.route.queryParams.subscribe(params => {
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
  });
  }
  
  VendorForm = this.fb.group({
    MrVendorCategoryCode:[''],
    VendorCode: ['', Validators.required],
    VendorName: ['', Validators.required],
    MrVendorTypeCode: ['', Validators.required],
    RegistrationNo: ['', Validators.required],
    LicenseNo: ['', Validators.required],
    MrIdTypeCode: ['', Validators.required],
    IdNo: ['', Validators.required],
    MobilePhnNo1: [''],
    MobilePhnNo2: [''],
    Email: ['', Validators.required],
    VendorRating: [''],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive:  [true],
    ReservedField1: [''],
    ReservedField2: [''],
    MrTaxCalcMethodCode: [''],
    IsVat: [true],
    TaxpayerNo: [''],
    TaxpayerName: [''],
    MrAddrTypeCode: [''],
    Addr: [''],
    Zipcode: [''],
    AreaCode2: [''], //kelurahan
    AreaCode1: [''], //kecamatan
    City: [''],
    Province: [''],
    RowVersion: ['']    
  })

  ngOnInit() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: "VENDOR_CATEGORY",
      ReserveField1: "HO"
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterCategoryObj).subscribe(
      (response) => {
        this.itemCategoryType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorCategoryCode: this.MrVendorCategoryCode
        });
      } 
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: "VENDOR_TYPE",
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterTypeObj).subscribe(
      (response) => {
        this.itemType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorTypeCode: this.itemType[0].MasterCode
        });
      } 
    );

    var refMasterIdObj = {
      RefMasterTypeCode: "ID_TYPE_VENDOR",
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrIdTypeCode: this.itemIdType[0].MasterCode
        });
      } 
    );

    var refMasterAssignmentObj = {
      RefMasterTypeCode: "TASK_ASSIGNMENT_TYPE",
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterAssignmentObj).subscribe(
      (response) => {
        this.itemAssignmentType = response["ReturnObject"];
        this.VendorForm.patchValue({
          ReservedField1: this.itemAssignmentType[0].MasterCode
        });
      } 
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: "TAX_CALC_METHOD",
    }
    this.http.post("http://r3app-server/FOUNDATION_R3/RefMaster/GetListActiveRefMaster", refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrTaxCalcMethodCode: this.itemCalcMethodType[0].MasterCode
        });
      } 
    );

    this.inputLookupParentObj = new InputLookupObj();
    this.inputLookupParentObj.urlJson       = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.urlQryPaging  = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson    = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.genericJson   = "./assets/uclookup/vendor/lookupHOParent.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = 'RM.RESERVE_FIELD_2';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.MrVendorCategoryCode;
    this.arrCrit.push(critObj);
    this.inputLookupParentObj.addCritInput = this.arrCrit;

    this.VendorForm.controls.MrVendorCategoryCode.disable();
    this.VendorForm.controls.AreaCode2.disable();
    this.VendorForm.controls.AreaCode1.disable();
    this.VendorForm.controls.City.disable();
    this.VendorForm.controls.Province.disable();

    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson       = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging  = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson    = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson   = "./assets/uclookup/zipcode/lookupZipcode.json";
  }

  getLookup(event){
    this.VendorForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
    console.log(event)
  }


  updateValueAndValidityForm(){
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  checkHOType(){
    if(this.VendorForm.controls.MrVendorTypeCode.value != 'P'){
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.updateValueAndValidityForm();
    }else{
      this.VendorForm.controls.RegistrationNo.clearValidators();
      this.VendorForm.controls.LicenseNo.clearValidators();
      this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      this.VendorForm.controls.IdNo.setValidators(Validators.required);
      this.updateValueAndValidityForm();
    }
  }
}
