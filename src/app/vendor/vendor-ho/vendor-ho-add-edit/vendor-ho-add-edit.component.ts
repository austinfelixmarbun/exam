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
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { formatDate } from '@angular/common';

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

  result: any;
  check: any;
  inputLookupParentObj: any;
  inputLookupZipcodeObj: any;
  MrVendorCategoryCode: any;
  arrCrit: any;
  mode: string = "add";
  vendorHoObj: any;
  VendorId: any;
  ButtonLbl: string = "Continue";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      this.VendorId = params['VendorId'];
      this.mode = params['mode'];
    });
  }

  VendorForm = this.fb.group({
    MrVendorCategoryCode: [''],
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
    VendorRating: [''],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
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
    AreaCode2: [{value: '', disabled: true}], //kelurahan
    AreaCode1: [{value: '', disabled: true}], //kecamatan
    City: [{value: '', disabled: true}],
    Province: [{value: '', disabled: true}],
    RowVersionVendor: [''],
    RowVersionVendorAddr: ['']
  })

  ngOnInit() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    var refMasterCategoryObj = {
      RefMasterTypeCode: "VENDOR_CATEGORY",
      ReserveField1: "HO"
    }
    this.http.post(AdInsConstant.GetRefMasterListKeyValueActiveByCode, refMasterCategoryObj).subscribe(
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

    if (this.MrVendorCategoryCode == "SURVEYOR_HO") {
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

    this.inputLookupParentObj = new InputLookupObj();
    this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupHOParent.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupHOParent.json";
    if(this.MrVendorCategoryCode != "SUPPLIER_HO"){
      this.inputLookupParentObj.isRequired = false;
    }
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = 'RM.RESERVE_FIELD_2';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.MrVendorCategoryCode;
    this.arrCrit.push(critObj);
    this.inputLookupParentObj.addCritInput = this.arrCrit;


    this.VendorForm.controls.VendorRating.disable();
    this.VendorForm.controls.MrVendorCategoryCode.disable();

    if (this.mode == "edit") {
      this.ButtonLbl = "Submit";
      var vendorObj = new VendorObj();
      vendorObj.VendorId = this.VendorId; 
      this.VendorForm.controls.VendorCode.disable();
      this.http.post(AdInsConstant.GetVendorHOAndVendorAddr, vendorObj).subscribe(
        (response) => {
          this.result = response;
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
            ReservedField1: this.result.VendorObj.ReservedField1,
            ReservedField2: this.result.VendorObj.ReservedField2,
            MrTaxCalcMethodCode: this.result.VendorObj.MrTaxCalcMethodCode,
            IsVat: this.result.VendorObj.IsVat,
            TaxpayerNo: this.result.VendorObj.TaxpayerNo,
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
            this.inputLookupParentObj.nameSelect = "";
          } else {
            this.http.post(AdInsConstant.GetVendorByVendorId, Parent).subscribe(
              (response) => {
                this.inputLookupParentObj.nameSelect = response["VendorName"];
                this.inputLookupZipcodeObj.nameSelect = this.result["VendorAddrObj"].Zipcode;
              }
            )
          }
        },
        (error) => {
          console.log(error);
        }
      );
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

  SaveForm() {
    this.vendorHoObj = new VendorHoObj();
    var vendorObj = {
      MrVendorCategoryCode: "",
      VendorCode: this.VendorForm.controls.VendorCode.value,
      VendorName: this.VendorForm.controls.VendorName.value,
      MrVendorTypeCode: this.VendorForm.controls.MrVendorTypeCode.value,
      RegistrationNo: this.VendorForm.controls.RegistrationNo.value,
      LicenseNo: this.VendorForm.controls.LicenseNo.value,
      MrIdTypeCode: "",
      IdNo: this.VendorForm.controls.IdNo.value,
      MobilePhnNo1: this.VendorForm.controls.MobilePhnNo1.value,
      MobilePhnNo2: this.VendorForm.controls.MobilePhnNo2.value,
      Email: this.VendorForm.controls.Email.value,
      VendorRating: this.VendorForm.controls.VendorRating.value,
      EstablishmentDt: this.VendorForm.controls.EstablishmentDt.value,
      PartnershipDt: this.VendorForm.controls.PartnershipDt.value,
      IsActive: this.VendorForm.controls.IsActive.value,
      VendorParentId: this.VendorForm.controls.VendorParentId.value,
      ReservedField1: this.VendorForm.controls.ReservedField1.value,
      ReservedField2: this.VendorForm.controls.ReservedField2.value,
      MrTaxCalcMethodCode: this.VendorForm.controls.MrTaxCalcMethodCode.value,
      IsVat: this.VendorForm.controls.IsVat.value,
      TaxpayerNo: this.VendorForm.controls.TaxpayerNo.value,
      TaxpayerName: this.VendorForm.controls.TaxpayerName.value
    }

    if (vendorObj.MrVendorTypeCode == "P") {
      vendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value
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
      this.vendorHoObj.VendorObj = vendorObj;
      this.vendorHoObj.VendorAddrObj = vendorAddrObj;
      
      this.vendorHoObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
      this.vendorHoObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
      this.vendorHoObj.VendorObj.VendorId = this.VendorId;
      this.vendorHoObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
      this.vendorHoObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
      this.vendorHoObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

      this.http.post(AdInsConstant.EditVendorHO, this.vendorHoObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Vendor/HO/Paging');
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.vendorHoObj.VendorObj = vendorObj;
      this.vendorHoObj.VendorAddrObj = vendorAddrObj;
      this.vendorHoObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

      this.http.post(AdInsConstant.AddVendorHO, this.vendorHoObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(['/Vendor/HO/Registration'],{queryParams :{"VendorId" : response['VendorObj'].VendorId}});
        },
        (error) => {
          console.log(error);
        });
    }
  }
}
