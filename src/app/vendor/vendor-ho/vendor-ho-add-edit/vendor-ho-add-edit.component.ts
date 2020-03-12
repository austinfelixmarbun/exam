import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { VendorHoObj } from 'app/shared/model/VendorHoObj.Model';

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
  mode:any = "add";
  vendorHoObj: any;

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
    VendorParentId: [''],
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

    
    this.VendorForm.controls.VendorRating.disable();
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

  getLookupParent(event){
    this.VendorForm.patchValue({
      VendorParentId: event.VendorId
    });
  }


  getLookupZipcode(event){
    this.VendorForm.patchValue({
      AreaCode2: event.AreaCode2,
      AreaCode1: event.AreaCode1,
      City: event.City,
      Province: event.Province
    });
  }


  updateValueAndValidityForm(){
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  CheckHOType(){
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

  SaveForm(VendorForm){
    console.log(VendorForm)
    this.vendorHoObj = new VendorHoObj();
    if (this.mode == "edit") {
        // this.editUrl = this.foundationUrl + AdInsConstant.EditRefBizUnit;
        // this.bizUnitObj.BizUnitCode = this.result.BizUnitCode;
        // this.bizUnitObj.RefBizUnitId = this.RefBizUnitId;
        
        // this.http.post(this.editUrl, this.bizUnitObj).subscribe(
        //     (response) => {
        //         this.toastr.successMessage(response["message"]);
        //         this.router.navigateByUrl('/organization/businessunit');
        //     },
        //     (error) => {
        //         console.log(error);
        //     });
    }
    else {
        var vendorObj ={
          MrVendorCategoryCode: this.MrVendorCategoryCode,
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
          IsActive:  this.VendorForm.controls.IsActive.value,
          VendorParentId: this.VendorForm.controls.VendorParentId.value,
          ReservedField1: this.VendorForm.controls.ReservedField1.value,
          ReservedField2: this.VendorForm.controls.ReservedField2.value,
          MrTaxCalcMethodCode: this.VendorForm.controls.MrTaxCalcMethodCode.value,
          IsVat: this.VendorForm.controls.IsVat.value,
          TaxpayerNo: this.VendorForm.controls.TaxpayerNo.value,
          TaxpayerName: this.VendorForm.controls.TaxpayerName.value
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

        this.vendorHoObj.VendorObj = vendorObj;
        this.vendorHoObj.VendorAddrObj = vendorAddrObj;

        this.http.post(AdInsConstant.AddVendorHO, this.vendorHoObj).subscribe(
            (response) => {
                console.log(response);
                this.toastr.successMessage(response["message"]);
                this.router.navigateByUrl('/Vendor/HO/Paging');
            },
            (error) => {
                console.log(error);
            });
    }
  }
}
