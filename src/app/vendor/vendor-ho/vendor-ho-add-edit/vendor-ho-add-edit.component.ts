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
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-vendor-ho-add-edit',
  templateUrl: './vendor-ho-add-edit.component.html',
  providers: [NGXToastrService]
})
export class VendorHoAddEditComponent implements OnInit {
  itemCategoryType: any;
  itemType: any;
  itemIdType: any;
  itemAssignmentType: any;
  itemCalcMethodType: any;

  businessDt: Date;
  result: any;
  check: any;
  inputLookupParentObj: InputLookupObj = new InputLookupObj();
  inputLookupATPMObj: InputLookupObj = new InputLookupObj();
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj();
  MrVendorCategoryCode: any;
  arrCrit: any;
  mode: string = "add";
  vendorHoObj: any;
  VendorId: any;
  isHidden: boolean = true;
  RsvField: string;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      this.VendorId = params['VendorId'];
      if (params['mode'] != null) {
        this.mode = params['mode'];
      }
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
    MobilePhnNo1: ['', Validators.pattern("^[0-9]+$")],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    VendorRating: [''],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
    VendorParentId: [''],
    MrTaxCalcMethodCode: ['', Validators.required],
    IsVat: [true, Validators.required],
    TaxIdNo: ['', Validators.required],
    TaxpayerName: ['', Validators.required],
    MrAddrTypeCode: [''],
    Addr: [''],
    AreaCode2: [{ value: '', disabled: true }], //kelurahan
    AreaCode1: [{ value: '', disabled: true }], //kecamatan
    City: [{ value: '', disabled: true }],
    Province: [{ value: '', disabled: true }],
    RowVersionVendor: [''],
    RowVersionVendorAddr: [''],
    IsNpwpExist: [false],
    SupplBadStatus:[''],
    IsOneAffiliate: [false],
    VendorAtpmCode: []
  })

  ngOnInit() {
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    this.VendorForm.controls.VendorRating.disable();
    this.VendorForm.controls.MrVendorCategoryCode.disable();

    if (this.mode == "edit") {
      this.VendorForm.controls.VendorCode.disable();
      this.getData();
    } else {
      this.setDropdown();
      this.setLookup();
      this.checkType();
    }
  }

  getData() {
    this.http.post(URLConstant.GetVendorAndVendorAddr, { VendorId: this.VendorId }).subscribe(
      (response) => {
        this.result = response;
        this.setDropdown();
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
          RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist,
          VendorAtpmCode: this.result.VendorObj.VendorAtpmCode,
          IsOneAffiliate: this.result.VendorObj.IsOneAffiliate,
          SupplBadStatus: this.result.VendorObj.SupplBadStatus,
        });

        this.setLookup();
        this.checkType();
      }
    );
  }

  setDropdown() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorCategory,
      ReserveField1: CommonConstant.HeadOffice
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterCategoryObj).subscribe(
      (response) => {
        this.itemCategoryType = response[CommonConstant.ReturnObj];
        if (this.itemCategoryType.length > 0) {
          this.VendorForm.patchValue({
            MrVendorCategoryCode: this.MrVendorCategoryCode
          });
        }
      }
    );

    var refMasterTypeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorType,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterTypeObj).subscribe(
      (response) => {
        this.itemType = response[CommonConstant.ReturnObj];
        if (this.itemType.length > 0) {
          if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrVendorTypeCode: this.itemType[0].Key
            });
            if (this.itemType[0].Key == "C") {
              this.RsvField = CommonConstant.CustTypeCompany
            } else {
              this.RsvField = CommonConstant.CustTypePersonal
            }
          }else{
            if (this.VendorForm.controls.MrVendorTypeCode.value == "C") {
              this.RsvField = CommonConstant.CustTypeCompany
            } else {
              this.RsvField = CommonConstant.CustTypePersonal
            }
          }

          var refMasterIdObj = {
            RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
            ReserveField1: this.RsvField,
          }
          this.http.post(URLConstant.GetListActiveRefMasterWithReserveFieldAll, refMasterIdObj).subscribe(
            (response) => {
              this.itemIdType = response[CommonConstant.ReturnObj];
              if (this.mode != "edit") {
                if (this.itemIdType.length > 0) {
                  this.VendorForm.patchValue({
                    MrIdTypeCode: this.itemIdType[0].Key
                  });
                }
              }
            }
          );
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
            this.VendorForm.patchValue({
              MrTaxCalcMethodCode: this.itemCalcMethodType[0].Key
            });
          }
        }
      }
    );
  }

  NpwpCheck(isGetData: boolean = false) {
    if (this.VendorForm.controls.IsNpwpExist.value == true) {
      this.isHidden = false;
      this.inputLookupZipcodeObj.isRequired = true;
      this.VendorForm.controls.TaxIdNo.setValidators(Validators.required);
      this.VendorForm.controls.TaxpayerName.setValidators(Validators.required);
    } else {
      this.inputLookupZipcodeObj.isRequired = false;
      if (!isGetData) this.VendorForm.controls['Zipcode']['controls'].value.updateValueAndValidity();
      this.VendorForm.controls.TaxIdNo.clearValidators();
      this.VendorForm.controls.TaxpayerName.clearValidators();
      this.isHidden = true;
    }
    this.VendorForm.controls.TaxIdNo.updateValueAndValidity();
    this.VendorForm.controls.TaxpayerName.updateValueAndValidity();
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

  getLookupATPM(ev){
    this.VendorForm.patchValue({
      VendorAtpmCode: ev.VendorCode,
    });
  }

  updateValueAndValidityForm() {
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  checkType() {
    if (this.VendorForm.controls.MrVendorTypeCode.value != 'P') {
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypeCompany
      this.updateValueAndValidityForm();
    } else {
      this.VendorForm.controls.RegistrationNo.clearValidators();
      this.VendorForm.controls.LicenseNo.clearValidators();
      this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      this.VendorForm.controls.IdNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypePersonal
      this.updateValueAndValidityForm();
    }

      var refMasterIdObj = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
        ReserveField1: this.RsvField,
      }
      this.http.post(URLConstant.GetListActiveRefMasterWithReserveFieldAll, refMasterIdObj).subscribe(
        (response) => {
          this.itemIdType = response[CommonConstant.ReturnObj];
          if (this.itemIdType.length > 0) {
            if(this.mode!="edit"){
              this.VendorForm.patchValue({
                MrIdTypeCode: this.itemIdType[0].Key
              });
            }else{
              this.VendorForm.patchValue({
                MrIdTypeCode: this.result.VendorObj.MrIdTypeCode
              });
            }
          }
        }
      );
  }

  Back() {
    if (this.mode == "edit") {
      this.router.navigate(['/Vendor/HO/Registration'], { queryParams: { "VendorId": this.VendorId, "mode": "edit" } });
    } else {
      this.router.navigate(["/Vendor/Paging"], { queryParams: { "MrVendorCategoryCode": this.MrVendorCategoryCode } });
    }
  }

  setLookup() {
    this.inputLookupZipcodeObj.urlJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupZipcodeObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupZipcodeObj.pagingJson = "./assets/uclookup/zipcode/lookupZipcode.json";
    this.inputLookupZipcodeObj.genericJson = "./assets/uclookup/zipcode/lookupZipcode.json";


    this.inputLookupParentObj.urlJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupParentObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupParentObj.pagingJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.genericJson = "./assets/uclookup/vendor/lookupVendorParent.json";
    this.inputLookupParentObj.addCritInput = new Array();

    if (this.MrVendorCategoryCode != "SUPPLIER_HO") {
      this.inputLookupParentObj.isRequired = false;
    }else{
      this.inputLookupATPMObj.urlJson = "./assets/uclookup/vendor/lookupVendorParent.json";
      this.inputLookupATPMObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
      this.inputLookupATPMObj.urlEnviPaging = environment.FoundationR3Url;
      this.inputLookupATPMObj.pagingJson = "./assets/uclookup/vendor/lookupVendorParent.json";
      this.inputLookupATPMObj.genericJson = "./assets/uclookup/vendor/lookupVendorParent.json";
      this.inputLookupATPMObj.isRequired = false;
      this.inputLookupATPMObj.addCritInput = new Array();

      var critInput = new CriteriaObj();
      critInput.propName = "MR_VENDOR_CATEGORY_CODE";
      critInput.restriction = AdInsConstant.RestrictionEq;
      critInput.value = CommonConstant.SUPPLIER_ATPM;
      this.inputLookupATPMObj.addCritInput.push(critInput);
      this.inputLookupATPMObj.title = CommonConstant.TITLE_SUPPLIER_ATPM;
      this.inputLookupATPMObj.isReady = true;

    }

    var critVendorClass = new CriteriaObj();
    critVendorClass.propName = "MR_VENDOR_CLASS";
    critVendorClass.restriction = AdInsConstant.RestrictionEq;
    critVendorClass.value = "HOLDING";
    this.inputLookupParentObj.addCritInput.push(critVendorClass);

    var critInput = new CriteriaObj();
    critInput.propName = "MR_VENDOR_CATEGORY_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = "SUPPLIER_HOLDING";
    this.inputLookupParentObj.addCritInput.push(critInput);
    this.inputLookupParentObj.title = "Supplier Holding";

    if (this.mode == "edit") {
      if (this.result.VendorObj.VendorParentId != null) {
        this.inputLookupParentObj.jsonSelect = { VendorName: this.result.VendorParentName };
      }
      if (this.result.VendorAddrObj != null) {
        this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
      }
      if (this.result.VendorObj.VendorAtpmCode != null || this.result.VendorObj.VendorAtpmCode != "") {
        this.inputLookupATPMObj.jsonSelect = { VendorName: this.result.VendorObj.VendorAtpmName };
      }
    }

    this.inputLookupParentObj.isReady = true;
    this.inputLookupZipcodeObj.isReady = true;

    this.NpwpCheck(true);
  }

  SaveForm() {
    if (Date.parse(this.VendorForm.controls.EstablishmentDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Establishment Date Must Be Lesser Than Business Date");
    }
    else if (Date.parse(this.VendorForm.controls.PartnershipDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Partnership Date Must Be Lesser Than Business Date");
    }
    else {
      this.vendorHoObj = new VendorHoObj();
      this.vendorHoObj.VendorObj = new VendorObj();
      this.vendorHoObj.VendorAddrObj = new VendorAddrObj();
      this.vendorHoObj.VendorObj.MrVendorCategoryCode = "";
      this.vendorHoObj.VendorObj.VendorCode = this.VendorForm.controls.VendorCode.value;
      this.vendorHoObj.VendorObj.VendorName = this.VendorForm.controls.VendorName.value;
      this.vendorHoObj.VendorObj.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
      this.vendorHoObj.VendorObj.RegistrationNo = this.VendorForm.controls.RegistrationNo.value;
      this.vendorHoObj.VendorObj.LicenseNo = this.VendorForm.controls.LicenseNo.value;
      this.vendorHoObj.VendorObj.IdNo = this.VendorForm.controls.IdNo.value;
      this.vendorHoObj.VendorObj.MobilePhnNo1 = this.VendorForm.controls.MobilePhnNo1.value;
      this.vendorHoObj.VendorObj.MobilePhnNo2 = this.VendorForm.controls.MobilePhnNo2.value;
      this.vendorHoObj.VendorObj.Email = this.VendorForm.controls.Email.value;
      this.vendorHoObj.VendorObj.VendorRating = this.VendorForm.controls.VendorRating.value;
      this.vendorHoObj.VendorObj.EstablishmentDt = this.VendorForm.controls.EstablishmentDt.value;
      this.vendorHoObj.VendorObj.PartnershipDt = this.VendorForm.controls.PartnershipDt.value;
      this.vendorHoObj.VendorObj.IsActive = this.VendorForm.controls.IsActive.value;
      this.vendorHoObj.VendorObj.VendorParentId = this.VendorForm.controls.VendorParentId.value;
      this.vendorHoObj.VendorObj.MrVendorClass = CommonConstant.HeadOffice;
      this.vendorHoObj.VendorObj.MrTaxCalcMethodCode = this.VendorForm.controls.MrTaxCalcMethodCode.value;
      this.vendorHoObj.VendorObj.IsVat = this.VendorForm.controls.IsVat.value;
      this.vendorHoObj.VendorObj.IsNpwpExist = this.VendorForm.controls.IsNpwpExist.value;
      this.vendorHoObj.VendorObj.VendorAtpmCode = this.VendorForm.controls.VendorAtpmCode.value;
      this.vendorHoObj.VendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value;
      this.vendorHoObj.VendorObj.IsOneAffiliate = this.VendorForm.controls.IsOneAffiliate.value;
      this.vendorHoObj.VendorObj.SupplBadStatus = this.VendorForm.controls.SupplBadStatus.value;

      if (this.VendorForm.controls.IsNpwpExist.value == true) {
        this.vendorHoObj.VendorObj.TaxIdNo = this.VendorForm.controls.TaxIdNo.value;
        this.vendorHoObj.VendorObj.TaxpayerName = this.VendorForm.controls.TaxpayerName.value;

        this.vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        this.vendorHoObj.VendorAddrObj.Addr = this.VendorForm.controls.Addr.value;
        this.vendorHoObj.VendorAddrObj.Zipcode = this.VendorForm.controls["Zipcode"]["controls"].value.value;
        this.vendorHoObj.VendorAddrObj.AreaCode2 = this.VendorForm.controls.AreaCode2.value;
        this.vendorHoObj.VendorAddrObj.AreaCode1 = this.VendorForm.controls.AreaCode1.value;
        this.vendorHoObj.VendorAddrObj.City = this.VendorForm.controls.City.value;
        this.vendorHoObj.VendorAddrObj.Province = this.VendorForm.controls.Province.value;
      } else if (this.result != null) {
        this.vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        this.vendorHoObj.VendorAddrObj.Addr = this.result.VendorAddrObj.Addr;
        this.vendorHoObj.VendorAddrObj.Zipcode = this.result.VendorAddrObj.Zipcode;
        this.vendorHoObj.VendorAddrObj.AreaCode2 = this.result.VendorAddrObj.AreaCode2;
        this.vendorHoObj.VendorAddrObj.AreaCode1 = this.result.VendorAddrObj.AreaCode1;
        this.vendorHoObj.VendorAddrObj.City = this.result.VendorAddrObj.City;
        this.vendorHoObj.VendorAddrObj.Province = this.result.VendorAddrObj.Province;
      }

      if (this.mode == "edit") {
        this.vendorHoObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        this.vendorHoObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
        this.vendorHoObj.VendorObj.VendorId = this.VendorId;
        this.vendorHoObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
        this.vendorHoObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
        this.vendorHoObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

        this.http.post(URLConstant.EditVendorHO, this.vendorHoObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(['/Vendor/HO/Registration'], { queryParams: { "VendorId": this.VendorId, "mode": "edit" } });
          });
      }
      else {
        this.vendorHoObj.VendorObj.MrVendorCategoryCode = this.MrVendorCategoryCode;

        this.http.post(URLConstant.AddVendorHO, this.vendorHoObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["message"]);
            this.router.navigate(['/Vendor/HO/Registration'], { queryParams: { "VendorId": response['VendorObj'].VendorId } });
          });
      }
    }
  }
}
