import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { VendorService } from '../vendor.service';
import { formatDate } from '@angular/common';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { VendorHoObj } from 'app/shared/model/VendorHoObj.Model';

@Component({
  selector: 'app-vendor-holding-add-edit',
  templateUrl: './vendor-holding-add-edit.component.html',
  styleUrls: ['./vendor-holding-add-edit.component.scss'],
  providers: [VendorService, NGXToastrService]
})
export class VendorHoldingAddEditComponent implements OnInit {
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
  vendorObj: any;
  VendorId: any;
  ButtonLbl: string = "Continue";

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService, private vendorService: VendorService) {
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
    AreaCode2: [{ value: '', disabled: true }], //kelurahan
    AreaCode1: [{ value: '', disabled: true }], //kecamatan
    City: [{ value: '', disabled: true }],
    Province: [{ value: '', disabled: true }],
    RowVersionVendor: [''],
    RowVersionVendorAddr: ['']
  });


  ngOnInit() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    var refMasterCategoryObj = {
      RefMasterTypeCode: "VENDOR_CATEGORY",
      ReserveField1: "HOLDING"
    }
    this.vendorService.GetRefMasterListKeyValuePair(refMasterCategoryObj).subscribe(
      (response) => {
        this.itemCategoryType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrVendorCategoryCode: response["ReturnObject"][0].Key
        });
      }
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: "VENDOR_TYPE",
    }
    this.vendorService.GetRefMasterListKeyValuePair(refMasterTypeObj).subscribe(
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
    this.vendorService.GetRefMasterListKeyValuePair(refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrIdTypeCode: this.itemIdType[0].Key
        });
      }
    );

    var refMasterCalcMethodObj = {
      RefMasterTypeCode: "TAX_CALC_METHOD",
    }
    this.vendorService.GetRefMasterListKeyValuePair(refMasterCalcMethodObj).subscribe(
      (response) => {
        this.itemCalcMethodType = response["ReturnObject"];
        this.VendorForm.patchValue({
          MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
        });
      }
    );
    
    if (this.mode == "edit") {
      this.ButtonLbl = "Submit";
      var vendorObj = new VendorObj();
      vendorObj.VendorId = this.VendorId; 
      this.VendorForm.controls.VendorCode.disable();
      this.vendorService.GetVendorHOAndVendorAddrByVendorId(vendorObj).subscribe(
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
            Zipcode: this.result.VendorAddrObj.Zipcode,
            RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion
          });
          this.inputLookupZipcodeObj.nameSelect = this.result.VendorAddrObj.Zipcode;
          this.inputLookupZipcodeObj.idSelect = this.result.VendorAddrObj.Zipcode;
          this.checkType();
        },
        (error) => {
          console.log(error);
        }
      );
    }

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

  SaveForm() {
    this.vendorObj = new VendorHoObj();
    var vendorObj = {
      MrVendorCategoryCode: this.VendorForm.controls.MrVendorCategoryCode.value,
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
      EstablishmentDt: this.VendorForm.controls.EstablishmentDt.value,
      PartnershipDt: this.VendorForm.controls.PartnershipDt.value,
      IsActive: this.VendorForm.controls.IsActive.value,
      VendorParentId: this.VendorForm.controls.VendorParentId.value,
      ReservedField1: this.VendorForm.controls.ReservedField1.value,
      ReservedField2: this.VendorForm.controls.ReservedField2.value,
      MrTaxCalcMethodCode: this.VendorForm.controls.MrTaxCalcMethodCode.value,
      IsVat: this.VendorForm.controls.IsVat.value,
      TaxpayerNo: this.VendorForm.controls.TaxpayerNo.value,
      TaxpayerName: this.VendorForm.controls.TaxpayerName.value,
      MrVendorClass : "HOLDING"
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
      this.vendorObj.VendorObj = vendorObj;
      this.vendorObj.VendorAddrObj = vendorAddrObj;
      
      this.vendorObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
      this.vendorObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
      this.vendorObj.VendorObj.VendorId = this.VendorId;
      this.vendorObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
      this.vendorObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
      this.vendorObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

      this.vendorService.EditVendor(this.vendorObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigateByUrl('/Vendor/Holding/Paging');
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      this.vendorObj.VendorObj = vendorObj;
      this.vendorObj.VendorAddrObj = vendorAddrObj;
      this.vendorObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

      this.vendorService.AddVendor(this.vendorObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          this.router.navigate(['/Vendor/Holding/Registration'],{queryParams :{"VendorId" : response['VendorObj'].VendorId}});
        },
        (error) => {
          console.log(error);
        });
    }
  }

  checkType() {
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

}
