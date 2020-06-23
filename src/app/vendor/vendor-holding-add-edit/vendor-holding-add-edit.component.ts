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
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';

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
  vendorHoldingObj: any;
  VendorId: any;
  ButtonLbl: string = "Continue";
  businessDt: Date;
  isHidden: boolean = true;

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
    Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    VendorRating: [''],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
    VendorParentId: [''],
    ReservedField1: [''],
    ReservedField2: [''],
    MrTaxCalcMethodCode: [''],
    IsVat: [true],
    TaxIdNo: [''],
    TaxpayerName: [''],
    MrAddrTypeCode: [''],
    Addr: [''],
    Zipcode: [''],
    AreaCode2: [{ value: '', disabled: true }], //kelurahan
    AreaCode1: [{ value: '', disabled: true }], //kecamatan
    City: [{ value: '', disabled: true }],
    Province: [{ value: '', disabled: true }],
    RowVersionVendor: [''],
    RowVersionVendorAddr: [''],
    IsNpwpExist: [false]
  });


  ngOnInit() {
    var context = JSON.parse(localStorage.getItem("UserAccess"));
    this.businessDt = new Date(context["BusinessDt"]);
    if (this.mode == "edit") {
      this.ButtonLbl = "Submit";
      this.VendorForm.controls.VendorCode.disable();
      this.getData();
    } else {
      this.setDropdown();
      this.setLookup();
      this.checkType();
    }

  }

  getData(){
    this.vendorService.GetVendorAndVendorAddrByVendorId({VendorId :this.VendorId}).subscribe(
      (response) => {
        this.result = response;
        this.setDropdown();
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
          TaxIdNo: this.result.VendorObj.TaxIdNo,
          TaxpayerName: this.result.VendorObj.TaxpayerName,
          RowVersionVendor: this.result.VendorObj.RowVersion,
          MrAddrTypeCode: this.result.VendorObj.MrAddrTypeCode,
          Addr: this.result.VendorAddrObj.Addr,
          AreaCode2: this.result.VendorAddrObj.AreaCode2,
          AreaCode1: this.result.VendorAddrObj.AreaCode1,
          City: this.result.VendorAddrObj.City,
          Province: this.result.VendorAddrObj.Province,
          Zipcode: this.result.VendorAddrObj.Zipcode,
          RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist
        });

        this.setLookup();
        this.checkType();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setDropdown(){
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
        if(this.mode != "edit"){
          this.VendorForm.patchValue({
            MrVendorTypeCode: this.itemType[0].Key
          });
        }
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
        if(this.mode != "edit" || this.result.VendorObj.IsNpwpExist != true){
        this.VendorForm.patchValue({
          MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
        });
      }
      }
    );
  }

  NpwpCheck(){
    if(this.VendorForm.controls.IsNpwpExist.value == true){
      this.isHidden = false;
      this.inputLookupZipcodeObj.isRequired = true;
      this.VendorForm.controls.IsVat.setValidators(Validators.required);
      this.VendorForm.controls.MrTaxCalcMethodCode.setValidators(Validators.required);
      this.VendorForm.controls.TaxIdNo.setValidators(Validators.required);
      this.VendorForm.controls.TaxpayerName.setValidators(Validators.required);
    }else{
      this.isHidden = true;
      this.inputLookupZipcodeObj.isRequired = false;
      this.VendorForm.controls.IsVat.clearValidators();
      this.VendorForm.controls.MrTaxCalcMethodCode.clearValidators();
      this.VendorForm.controls.TaxIdNo.clearValidators();
      this.VendorForm.controls.TaxpayerName.clearValidators();
    }
    this.VendorForm.controls.IsVat.updateValueAndValidity();
    this.VendorForm.controls.MrTaxCalcMethodCode.updateValueAndValidity();
    this.VendorForm.controls.TaxIdNo.updateValueAndValidity();
    this.VendorForm.controls.TaxpayerName.updateValueAndValidity();
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
    if (Date.parse(this.VendorForm.controls.EstablishmentDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.errorMessage("Establishment Date Must Be Lesser Than Business Date");
    }
    else if (Date.parse(this.VendorForm.controls.PartnershipDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.errorMessage("Partnership Date Must Be Lesser Than Business Date");
    }
    else {
      this.vendorHoldingObj = new VendorHoObj();
      this.vendorHoldingObj.VendorObj = new VendorObj();
      this.vendorHoldingObj.VendorAddrObj = new VendorAddrObj();

      this.vendorHoldingObj.VendorObj.MrVendorCategoryCode = this.VendorForm.controls.MrVendorCategoryCode.value;
      this.vendorHoldingObj.VendorObj.VendorCode = this.VendorForm.controls.VendorCode.value;
      this.vendorHoldingObj.VendorObj.VendorName = this.VendorForm.controls.VendorName.value;
      this.vendorHoldingObj.VendorObj.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
      this.vendorHoldingObj.VendorObj.RegistrationNo = this.VendorForm.controls.RegistrationNo.value;
      this.vendorHoldingObj.VendorObj.LicenseNo = this.VendorForm.controls.LicenseNo.value;
      this.vendorHoldingObj.VendorObj.MrIdTypeCode = "";
      this.vendorHoldingObj.VendorObj.IdNo = this.VendorForm.controls.IdNo.value;
      this.vendorHoldingObj.VendorObj.MobilePhnNo1 = this.VendorForm.controls.MobilePhnNo1.value;
      this.vendorHoldingObj.VendorObj.MobilePhnNo2 = this.VendorForm.controls.MobilePhnNo2.value;
      this.vendorHoldingObj.VendorObj.Email = this.VendorForm.controls.Email.value;
      this.vendorHoldingObj.VendorObj.EstablishmentDt = this.VendorForm.controls.EstablishmentDt.value;
      this.vendorHoldingObj.VendorObj.PartnershipDt = this.VendorForm.controls.PartnershipDt.value;
      this.vendorHoldingObj.VendorObj.IsActive = this.VendorForm.controls.IsActive.value;
      this.vendorHoldingObj.VendorObj.VendorParentId = this.VendorForm.controls.VendorParentId.value;
      this.vendorHoldingObj.VendorObj.ReservedField1 = this.VendorForm.controls.ReservedField1.value;
      this.vendorHoldingObj.VendorObj.ReservedField2 = this.VendorForm.controls.ReservedField2.value;
      this.vendorHoldingObj.VendorObj.MrVendorClass = "HOLDING";

      if (this.vendorHoldingObj.VendorObj.MrVendorTypeCode == "P") {
        this.vendorHoldingObj.VendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value
      }

      if (this.VendorForm.controls.IsNpwpExist.value == true) {
        this.vendorHoldingObj.VendorObj.MrTaxCalcMethodCode = this.VendorForm.controls.MrTaxCalcMethodCode.value;
        this.vendorHoldingObj.VendorObj.IsVat = this.VendorForm.controls.IsVat.value;
        this.vendorHoldingObj.VendorObj.TaxIdNo = this.VendorForm.controls.TaxIdNo.value;
        this.vendorHoldingObj.VendorObj.TaxpayerName = this.VendorForm.controls.TaxpayerName.value;

        this.vendorHoldingObj.VendorAddrObj.MrAddrTypeCode = "TAX";
        this.vendorHoldingObj.VendorAddrObj.Addr = this.VendorForm.controls.Addr.value;
        this.vendorHoldingObj.VendorAddrObj.Zipcode = this.VendorForm.controls["lookupZipcode"]["controls"].value.value;
        this.vendorHoldingObj.VendorAddrObj.AreaCode2 = this.VendorForm.controls.AreaCode2.value;
        this.vendorHoldingObj.VendorAddrObj.AreaCode1 = this.VendorForm.controls.AreaCode1.value;
        this.vendorHoldingObj.VendorAddrObj.City = this.VendorForm.controls.City.value;
        this.vendorHoldingObj.VendorAddrObj.Province = this.VendorForm.controls.Province.value;
      } else if (this.result != null) {
        this.vendorHoldingObj.VendorAddrObj.MrAddrTypeCode = "TAX";
        this.vendorHoldingObj.VendorAddrObj.Addr = this.result.VendorAddrObj.Addr;
        this.vendorHoldingObj.VendorAddrObj.Zipcode = this.result.VendorAddrObj.Zipcode;
        this.vendorHoldingObj.VendorAddrObj.AreaCode2 = this.result.VendorAddrObj.AreaCode2;
        this.vendorHoldingObj.VendorAddrObj.AreaCode1 = this.result.VendorAddrObj.AreaCode1;
        this.vendorHoldingObj.VendorAddrObj.City = this.result.VendorAddrObj.City;
        this.vendorHoldingObj.VendorAddrObj.Province = this.result.VendorAddrObj.Province;
      }


      if (this.mode == "edit") {
        this.vendorHoldingObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        this.vendorHoldingObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
        this.vendorHoldingObj.VendorObj.VendorId = this.VendorId;
        this.vendorHoldingObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
        this.vendorHoldingObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
        this.vendorHoldingObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

        this.vendorService.EditVendorHolding(this.vendorHoldingObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            this.router.navigateByUrl('/Vendor/Holding/Paging');
          },
          (error) => {
            console.log(error);
          });
      } else {
        this.vendorHoldingObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

        this.vendorService.AddVendorHolding(this.vendorHoldingObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(['/Vendor/Holding/Registration'], { queryParams: { "VendorId": response['VendorObj'].VendorId } });
          },
          (error) => {
            console.log(error);
          });
      }
    }
  }

  Back() {
    if (this.mode == "edit") {
      this.router.navigate(['/Vendor/Holding/Registration'], { queryParams: { "VendorId": this.VendorId, "mode": 'edit' } });
    } else {
      this.router.navigate(['/Vendor/Holding/Paging']);
    }

  }

  setLookup() {
    this.inputLookupZipcodeObj = new InputLookupObj();
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";

    if (this.result != null) {
      this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
    }

    this.inputLookupZipcodeObj.isReady = true;
    this.NpwpCheck();
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