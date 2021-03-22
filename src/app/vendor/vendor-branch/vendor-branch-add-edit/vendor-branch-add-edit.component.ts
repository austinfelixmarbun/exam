import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Validators, FormBuilder } from '@angular/forms';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { formatDate } from '@angular/common';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorBranchObj } from 'app/shared/model/VendorBranchObj.Model';
import { VendorBranchMainObj } from 'app/shared/model/VendorBranchMainObj.Model';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { VendorAttrContentObj } from 'app/shared/model/VendorAttrContentObj.Model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-branch-add-edit',
  templateUrl: './vendor-branch-add-edit.component.html',
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
  inputLookupParentObj: InputLookupObj = new InputLookupObj();
  inputLookupATPMObj: InputLookupObj = new InputLookupObj();
  inputLookupZipcodeObj: InputLookupObj = new InputLookupObj();

  MrVendorCategoryCode: string;
  MrVendorTypeCode: string;
  arrCrit: any;
  mode: string = "add";
  vendorBranchObj: any;
  VendorId: number;

  MRSupplierUpCalcMethod: any;
  itemTypeUpCalcMethod: any;
  itemSupplierClass: any;
  itemMaxRefundType: any;
  itemAssignmentTypeTele: any;
  businessDt: Date;

  isHidden: boolean = true;
  RsvField: string;
  Registration: string;
  Code: string;
  Name: string;
  VendorAttrList: any;
  ListInputLookUpObj = new Array<any>();
  vendorAttrRequest = new Array<VendorAttrContentObj>();
  isFormReady: boolean = false;
  reqVendorAttrObj: { listVendorAttrContentObj: any[]; };
  ListVendorAttrContent: any;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private cookieService: CookieService) {
    this.route.queryParams.subscribe(params => {
      if (params["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
      }
      this.VendorId = params['VendorId'];
      if (params['mode'] != null) {
        this.mode = params['mode'];
      }
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
    MobilePhnNo1: ['', Validators.pattern("^[0-9]+$")],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    VendorRating: [{ value: '', disabled: true }],
    EstablishmentDt: ['', Validators.required],
    PartnershipDt: ['', Validators.required],
    IsActive: [true],
    VendorParentId: [''],
    ReservedField2: [''], //Maximum Task load
    ReservedField3: [''],//Supplier calc up method
    ReservedField4: [''], //Supplier Class
    ReservedField5: [''], //BPKBAging
    // ReservedField6: [''], //DaysPAfterGolive
    ReservedField9: [''], //ASSGMNT_TYPE tele, field
    MrTaxCalcMethodCode: ['', Validators.required],
    IsVat: [true, Validators.required],
    TaxIdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
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
    IsOneAffiliate: [false]
  })

  HoTitle: string = "";
  SetTitleHoInfo() {
    switch (this.MrVendorCategoryCode) {
      case CommonConstant.SUPPLIER_HO:
        this.HoTitle = "Supplier ";
        break;
      case CommonConstant.SUPPLIER_HOLDING:
        this.HoTitle = "Supplier Holding ";
        break;
      case CommonConstant.SUPPLIER_BRANCH:
        this.HoTitle = "Supplier Branch ";
        break;
      case CommonConstant.SURVEYOR_HO:
        this.HoTitle = "Surveyor HO ";
        break;
      case CommonConstant.SURVEYOR_BRANCH:
        this.HoTitle = "Surveyor Branch ";
        break;
      case CommonConstant.ASSET_INSCO_HO:
        this.HoTitle = "Insurance HO ";
        break;
      case CommonConstant.ASSET_INSCO_BRANCH:
        this.HoTitle = "Insurance Branch ";
        break;
      case CommonConstant.LIFE_INSCO_BRANCH:
        this.HoTitle = "Life Insurance Branch ";
        break;
    }
  }

  DictDDLVendorAttr: {[id: string]: Array<any>} = {};
  ngOnInit() {
    this.SetTitleHoInfo();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDt = new Date(context[CommonConstant.BUSINESS_DT]);
    if (this.mode == "edit") {
      this.VendorForm.controls.VendorCode.disable();
      this.getData();
    } else {
      this.bindText()
      this.setDropdown();
      this.setLookup();
    }
    var reqListVendor = { "VendorId": this.VendorId };
    this.http.post(URLConstant.GetListVendorAttrContentByVendorId, reqListVendor).toPromise().then(
      (response) => {
        this.ListVendorAttrContent = response[CommonConstant.ReturnObj]
        if(this.ListVendorAttrContent != null){
          if (this.ListVendorAttrContent.length < 1) {
            var reqObj = { VendorCategoryCode: CommonConstant.SUPPLIER_BRANCH };
            this.http.post(URLConstant.GetListActiveVendorAttrByVendorCategoryCode, reqObj).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                this.VendorAttrList = response[CommonConstant.ReturnObj];
  
                let tempLookup = {};
                for (const vendorAttr of this.VendorAttrList) {
                  var formGroupObject = new Object();
                  formGroupObject["VendorAttrContentId"] = [0];
                  formGroupObject["VendorAttrId"] = [vendorAttr["VendorAttrId"]];
                  if (vendorAttr["VendorAttrType"] == 'T') {
                    formGroupObject["VendorAttrValue"] = [''];
                  }
                  else if (vendorAttr["VendorAttrType"] == 'L') {
                    var temp = vendorAttr["VendorAttrValue"].split(";");
                    this.DictDDLVendorAttr[vendorAttr["VendorAttrCode"]] = temp;
                    formGroupObject["VendorAttrValue"] = [temp[0]];
                  }
                  else {
                    formGroupObject["VendorAttrValue"] = [''];
                  }
                  parentFormGroup[vendorAttr["VendorAttrCode"]] = this.fb.group(formGroupObject);
  
                  if (vendorAttr["VendorAttrType"] == 'RM') {
                    tempLookup[vendorAttr["VendorAttrCode"]] = new InputLookupObj();
                    tempLookup[vendorAttr["VendorAttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[vendorAttr["VendorAttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                    tempLookup[vendorAttr["VendorAttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                    tempLookup[vendorAttr["VendorAttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[vendorAttr["VendorAttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                    tempLookup[vendorAttr["VendorAttrCode"]].title = vendorAttr.VendorAttrName;
                    tempLookup[vendorAttr["VendorAttrCode"]].isRequired = false;
                    var arrAddCrit = new Array();
                    var critAssetObj = new CriteriaObj();
                    critAssetObj.DataType = 'text';
                    critAssetObj.restriction = AdInsConstant.RestrictionEq;
                    critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                    critAssetObj.value = vendorAttr.VendorAttrValue;
                    arrAddCrit.push(critAssetObj);
                    tempLookup[vendorAttr["VendorAttrCode"]].addCritInput = arrAddCrit;
                  }
  
                }
                this.ListInputLookUpObj.push(tempLookup);
                console.log(this.VendorAttrList);
                console.log(this.VendorForm);
                this.VendorForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                console.log(this.VendorForm);
                this.isFormReady = true;
              }
            );
          }
          else {
  
            var reqObj = { VendorCategoryCode: CommonConstant.SUPPLIER_BRANCH };
            this.http.post(URLConstant.GetListActiveVendorAttrByVendorCategoryCode, reqObj).subscribe(
              async (response: any) => {
                var parentFormGroup = new Object();
                let tempLookup = {};
                this.VendorAttrList = response[CommonConstant.ReturnObj];
                for (const vendorAttr of this.VendorAttrList) {
                  var item = this.ListVendorAttrContent.find(x => x.VendorAttrId == vendorAttr.VendorAttrId);
                  if (item == undefined) {
                    var formGroupObject = new Object();
                    formGroupObject["VendorAttrContentId"] = [0];
                    formGroupObject["VendorAttrId"] = [vendorAttr["VendorAttrId"]];
  
                    if (vendorAttr["VendorAttrType"] == 'L') {
                      var temp = vendorAttr["VendorAttrValue"].split(";");
                      this.DictDDLVendorAttr[vendorAttr["VendorAttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [temp[0]];
                    } else {
                      formGroupObject["VendorAttrValue"] = [''];
                    }
                    parentFormGroup[vendorAttr["VendorAttrCode"]] = this.fb.group(formGroupObject);
  
                    if (vendorAttr["VendorAttrType"] == 'RM') {
                      tempLookup[vendorAttr["VendorAttrCode"]] = new InputLookupObj();
                      tempLookup[vendorAttr["VendorAttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["VendorAttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                      tempLookup[vendorAttr["VendorAttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                      tempLookup[vendorAttr["VendorAttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["VendorAttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["VendorAttrCode"]].title = vendorAttr.AttrName;
                      tempLookup[vendorAttr["VendorAttrCode"]].isRequired = false;
                      tempLookup[vendorAttr["VendorAttrCode"]].jsonSelect = vendorAttr["VendorAttrCode"];
  
                      var arrAddCrit = new Array();
                      var critAssetObj = new CriteriaObj();
                      critAssetObj.DataType = 'text';
                      critAssetObj.restriction = AdInsConstant.RestrictionEq;
                      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                      critAssetObj.value = vendorAttr.VendorAttrValue;
                      arrAddCrit.push(critAssetObj);
                      tempLookup[vendorAttr["VendorAttrCode"]].addCritInput = arrAddCrit;
                    }
                  }
                  else {
                    var formGroupObject = new Object();
                    formGroupObject["VendorAttrContentId"] = [0];
                    formGroupObject["VendorAttrId"] = [vendorAttr["VendorAttrId"]];
  
                    if (vendorAttr["VendorAttrType"] == 'T') {
                      formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                    }
                    else if (vendorAttr["VendorAttrType"] == 'RM') {
                      tempLookup[vendorAttr["VendorAttrCode"]] = new InputLookupObj();
                      tempLookup[vendorAttr["VendorAttrCode"]].urlJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["VendorAttrCode"]].urlQryPaging = URLConstant.GetPagingObjectBySQL;
                      tempLookup[vendorAttr["VendorAttrCode"]].urlEnviPaging = environment.FoundationR3Url;
                      tempLookup[vendorAttr["VendorAttrCode"]].pagingJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["VendorAttrCode"]].genericJson = "./assets/uclookup/RefMaster/lookupRefMaster.json";
                      tempLookup[vendorAttr["VendorAttrCode"]].title = vendorAttr.AttrName;
                      tempLookup[vendorAttr["VendorAttrCode"]].isRequired = false;
                      var arrAddCrit = new Array();
                      var critAssetObj = new CriteriaObj();
                      critAssetObj.DataType = 'text';
                      critAssetObj.restriction = AdInsConstant.RestrictionEq;
                      critAssetObj.propName = 'REF_MASTER_TYPE_CODE';
                      critAssetObj.value = vendorAttr.VendorAttrValue;
                      arrAddCrit.push(critAssetObj);
                      tempLookup[vendorAttr["VendorAttrCode"]].addCritInput = arrAddCrit;
                      var refMaster = {
                        RefMasterTypeCode: vendorAttr.VendorAttrValue,
                        MasterCode: item["AttrContent"]
                      };
                      await this.http.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMaster).toPromise().then(
                        (response) => {
                          tempLookup[vendorAttr["VendorAttrCode"]].jsonSelect = { Descr: response['Descr'] }
                        });
                      formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                    }
                    else if (vendorAttr["VendorAttrType"] == 'L') {
                      var temp = vendorAttr["VendorAttrValue"].split(";");
                      this.DictDDLVendorAttr[vendorAttr["VendorAttrCode"]] = temp;
                      formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                    }
                    else {
                      formGroupObject["VendorAttrValue"] = [item["AttrContent"]];
                    }
                    parentFormGroup[vendorAttr["VendorAttrCode"]] = this.fb.group(formGroupObject);
                  }
                }
  
                this.ListInputLookUpObj.push(tempLookup);
                this.VendorForm.addControl("VendorAttrList", this.fb.group(parentFormGroup));
                this.isFormReady = true;
              });
          }
        }
        
      }
    );
  }
  getData() {
    this.http.post(URLConstant.GetVendorBranchAndVendorTaxAddrByVendorId, { VendorId: this.VendorId }).subscribe(
      (response) => {
        this.result = response;
        this.setDropdown();
        this.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
        this.bindText();
        this.MrVendorTypeCode = this.result.VendorObj.MrVendorTypeCode;
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
          RowVersionVendorAddr: this.result.VendorAddrObj.RowVersion,
          IsNpwpExist: this.result.VendorObj.IsNpwpExist,
          IsOneAffiliate: this.result.VendorObj.IsOneAffiliate,
        });
        this.setLookup();
      }
    );
  }

  setDropdown() {
    var refMasterCategoryObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeVendorCategory
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

    var refMaxRefundType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaxRefundType
    }

    var refAssignmentType = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeAssgmntType
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refAssignmentType).subscribe(
      (response) => {
        this.itemAssignmentTypeTele = response[CommonConstant.ReturnObj];
        if (this.itemAssignmentTypeTele.length > 0) {
          this.VendorForm.patchValue({
            ReservedField9: this.itemAssignmentTypeTele[0].Key
          });
        }
      }
    );

    var refMrSupplierClass = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierClass
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMrSupplierClass).subscribe(
      (response) => {
        this.itemSupplierClass = response[CommonConstant.ReturnObj];
        if (this.itemSupplierClass.length > 0) {
          this.VendorForm.patchValue({
            ReservedField4: this.itemSupplierClass[0].Key
          });
        }
      }
    );

    var refMRSupplierUpCalcMethod = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSupplierUpCalcMethod,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMRSupplierUpCalcMethod).subscribe(
      (response) => {
        this.itemTypeUpCalcMethod = response[CommonConstant.ReturnObj];
        if (this.itemTypeUpCalcMethod.length > 0) {
          this.VendorForm.patchValue({
            ReservedField3: this.itemTypeUpCalcMethod[0].Key
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
          if (this.MrVendorCategoryCode == "AGENCY_PERSONAL") {
            var object = this.itemType.find(x => x.Key == 'P');
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypePersonal
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } else if (this.MrVendorCategoryCode == "AGENCY_COMPANY") {
            var object = this.itemType.find(x => x.Key == 'C');
            this.MrVendorTypeCode = object.Key;
            this.RsvField = CommonConstant.CustTypeCompany
            this.VendorForm.patchValue({
              MrVendorTypeCode: object.Key
            });
          } else if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrVendorTypeCode: this.itemType[0].Key
            });
          }

          var refMasterIdObj = {
            RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
            MappingCode: this.RsvField,
          }
          this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, refMasterIdObj).subscribe(
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
        if (this.MrVendorCategoryCode == "AGENCY_PERSONAL" || this.MrVendorCategoryCode == "AGENCY_COMPANY") {
          this.VendorForm.controls.MrVendorTypeCode.disable();
        }
        this.checkType();
      }
    );

    var refMasterIdObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
    }
    this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response[CommonConstant.ReturnObj];
        if (this.itemIdType.lenth > 0) {
          this.VendorForm.patchValue({
            MrIdTypeCode: this.itemIdType[0].Key
          });
        }
      }
    );

    if (this.MrVendorCategoryCode == "SURVEYOR_HO" || this.MrVendorCategoryCode == "ASSET_INSCO_HO") {
      var refMasterAssignmentObj = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeTaskAssignmentType,
      }
      this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterAssignmentObj).subscribe(
        (response) => {
          this.itemAssignmentType = response[CommonConstant.ReturnObj];
          if (this.itemAssignmentType.length > 0) {
            this.VendorForm.patchValue({
              ReservedField1: this.itemAssignmentType[0].Key
            });
          }
        }
      );
    }

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
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]);
      this.VendorForm.controls.TaxpayerName.setValidators(Validators.required);
    } else {
      this.inputLookupZipcodeObj.isRequired = false;
      if (!isGetData) this.VendorForm.controls['Zipcode']['controls'].value.updateValueAndValidity();
      this.VendorForm.controls.TaxIdNo.setValidators([Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]);
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

  updateValueAndValidityForm() {
    this.VendorForm.controls.MrIdTypeCode.updateValueAndValidity();
    this.VendorForm.controls.IdNo.updateValueAndValidity();
    this.VendorForm.controls.RegistrationNo.updateValueAndValidity();
    this.VendorForm.controls.LicenseNo.updateValueAndValidity();
  }

  checkType() {
    if (this.VendorForm.controls.MrVendorTypeCode.value != "") {
      this.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
    }
    if (this.MrVendorTypeCode == 'C') {
      this.VendorForm.controls.MrIdTypeCode.clearValidators();
      this.VendorForm.controls.IdNo.clearValidators();
      this.VendorForm.controls.RegistrationNo.setValidators(Validators.required);
      this.VendorForm.controls.LicenseNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypeCompany
    } else if (this.MrVendorTypeCode == 'P') {
      this.VendorForm.controls.RegistrationNo.clearValidators();
      this.VendorForm.controls.LicenseNo.clearValidators();
      this.VendorForm.controls.MrIdTypeCode.setValidators(Validators.required);
      this.VendorForm.controls.IdNo.setValidators(Validators.required);
      this.RsvField = CommonConstant.CustTypePersonal
    }
    this.updateValueAndValidityForm();

    var refMasterIdObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdTypeVendor,
      MappingCode: this.RsvField,
    }
    this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, refMasterIdObj).subscribe(
      (response) => {
        this.itemIdType = response[CommonConstant.ReturnObj];
        if (this.itemIdType.length > 0) {
          if (this.mode != "edit") {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.itemIdType[0].Key
            });
          } else {
            this.VendorForm.patchValue({
              MrIdTypeCode: this.result.VendorObj.MrIdTypeCode
            });
          }
        }
      }
    );
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
    this.inputLookupParentObj.isRequired = false;
    this.inputLookupParentObj.addCritInput = new Array();

    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_BRANCH) {
      var critInput = new CriteriaObj();
      critInput.propName = "MR_VENDOR_CATEGORY_CODE";
      critInput.restriction = AdInsConstant.RestrictionEq;
      critInput.value = "SUPPLIER_HO";
      this.inputLookupParentObj.addCritInput.push(critInput);
      this.inputLookupParentObj.title = "Supplier HO";



      this.VendorForm.controls.ReservedField3.setValidators(Validators.required);
      this.VendorForm.controls.ReservedField4.setValidators(Validators.required);

      this.UpdateValueAndValidity();
    }
    if (this.MrVendorCategoryCode == "SURVEYOR_BRANCH") {
      var critObjSurveyor = new CriteriaObj();
      critObjSurveyor.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjSurveyor.restriction = AdInsConstant.RestrictionEq;
      critObjSurveyor.value = "SURVEYOR_HO";
      this.inputLookupParentObj.addCritInput.push(critObjSurveyor);
      this.inputLookupParentObj.title = "Surveyor HO";

    }
    if (this.MrVendorCategoryCode == "ASSET_INSCO_BRANCH") {
      var critObjAssetInsurance = new CriteriaObj();
      critObjAssetInsurance.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjAssetInsurance.restriction = AdInsConstant.RestrictionEq;
      critObjAssetInsurance.value = "ASSET_INSCO_HO";
      this.inputLookupParentObj.addCritInput.push(critObjAssetInsurance);
      this.inputLookupParentObj.title = "Asset Insurance HO";

    }
    if (this.MrVendorCategoryCode == "LIFE_INSCO_BRANCH") {
      var critObjLifeInsurance = new CriteriaObj();
      critObjLifeInsurance.propName = 'MR_VENDOR_CATEGORY_CODE';
      critObjLifeInsurance.restriction = AdInsConstant.RestrictionEq;
      critObjLifeInsurance.value = "LIFE_INSCO_HO";
      this.inputLookupParentObj.addCritInput.push(critObjLifeInsurance);
      this.inputLookupParentObj.title = "Life Insurance HO";

    }

    if (this.mode == "edit") {
      if (this.result.VendorObj.VendorParentId != null) {
        this.inputLookupParentObj.jsonSelect = { VendorName: this.result.VendorParentName };
      }
      if (this.result.VendorAddrObj != null) {
        this.inputLookupZipcodeObj.jsonSelect = { Zipcode: this.result["VendorAddrObj"].Zipcode };
      }
    }


    var critVendorClass = new CriteriaObj();
    critVendorClass.propName = "MR_VENDOR_CLASS";
    critVendorClass.restriction = AdInsConstant.RestrictionEq;
    critVendorClass.value = CommonConstant.HeadOffice;
    this.inputLookupParentObj.addCritInput.push(critVendorClass);

    this.inputLookupZipcodeObj.isReady = true;
    this.inputLookupParentObj.isReady = true;

    this.NpwpCheck(true);
  }

  UpdateValueAndValidity() {
    this.VendorForm.controls.ReservedField3.updateValueAndValidity();
    this.VendorForm.controls.ReservedField4.updateValueAndValidity();
  }

  SaveForm() {
    if (Date.parse(this.VendorForm.controls.EstablishmentDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Establishment Date Must Be Lesser Than Business Date");
    }
    else if (Date.parse(this.VendorForm.controls.PartnershipDt.value) > Date.parse(formatDate(this.businessDt, 'yyyy-MM-dd', 'en-US'))) {
      this.toastr.warningMessage("Partnership Date Must Be Lesser Than Business Date");
    }
    else {
      this.vendorBranchObj = new VendorBranchObj();
      this.vendorBranchObj.VendorObj = new VendorObj();
      this.vendorBranchObj.VendorAddrObj = new VendorAddrObj();

      this.vendorBranchObj.VendorObj.MrVendorCategoryCode = this.VendorForm.controls.MrVendorCategoryCode.value;
      this.vendorBranchObj.VendorObj.VendorCode = this.VendorForm.controls.VendorCode.value;
      this.vendorBranchObj.VendorObj.VendorName = this.VendorForm.controls.VendorName.value;
      this.vendorBranchObj.VendorObj.MrVendorTypeCode = this.VendorForm.controls.MrVendorTypeCode.value;
      this.vendorBranchObj.VendorObj.RegistrationNo = this.VendorForm.controls.RegistrationNo.value;
      this.vendorBranchObj.VendorObj.LicenseNo = this.VendorForm.controls.LicenseNo.value;
      this.vendorBranchObj.VendorObj.MrIdTypeCode = this.VendorForm.controls.MrIdTypeCode.value;
      this.vendorBranchObj.VendorObj.IdNo = this.VendorForm.controls.IdNo.value;
      this.vendorBranchObj.VendorObj.MobilePhnNo1 = this.VendorForm.controls.MobilePhnNo1.value;
      this.vendorBranchObj.VendorObj.MobilePhnNo2 = this.VendorForm.controls.MobilePhnNo2.value;
      this.vendorBranchObj.VendorObj.Email = this.VendorForm.controls.Email.value;
      this.vendorBranchObj.VendorObj.VendorRating = this.VendorForm.controls.VendorRating.value;
      this.vendorBranchObj.VendorObj.EstablishmentDt = this.VendorForm.controls.EstablishmentDt.value;
      this.vendorBranchObj.VendorObj.PartnershipDt = this.VendorForm.controls.PartnershipDt.value;
      this.vendorBranchObj.VendorObj.IsActive = this.VendorForm.controls.IsActive.value;
      this.vendorBranchObj.VendorObj.VendorParentId = this.VendorForm.controls.VendorParentId.value;
      this.vendorBranchObj.VendorObj.ReservedField2 = "";
      this.vendorBranchObj.VendorObj.ReservedField3 = "";
      this.vendorBranchObj.VendorObj.ReservedField4 = "";
      this.vendorBranchObj.VendorObj.ReservedField5 = "";
      this.vendorBranchObj.VendorObj.ReservedField9 = "";
      this.vendorBranchObj.VendorObj.MrTaxCalcMethodCode = this.VendorForm.controls.MrTaxCalcMethodCode.value;
      this.vendorBranchObj.VendorObj.IsVat = this.VendorForm.controls.IsVat.value;
      this.vendorBranchObj.VendorObj.IsNpwpExist = this.VendorForm.controls.IsNpwpExist.value;
      this.vendorBranchObj.VendorObj.IsOneAffiliate = this.VendorForm.controls.IsOneAffiliate.value;
    }

    if (this.vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SUPPLIER_BRANCH) {
      this.vendorBranchObj.VendorObj.ReservedField3 = this.VendorForm.controls.ReservedField3.value;
      this.vendorBranchObj.VendorObj.ReservedField4 = this.VendorForm.controls.ReservedField4.value;
      this.vendorBranchObj.VendorObj.ReservedField5 = this.VendorForm.controls.ReservedField5.value;
    }
    if (this.vendorBranchObj.VendorObj.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
      this.vendorBranchObj.VendorObj.ReservedField2 = this.VendorForm.controls.ReservedField2.value;
      this.vendorBranchObj.VendorObj.ReservedField9 = this.VendorForm.controls.ReservedField9.value;
    }

    if (this.VendorForm.controls.IsNpwpExist.value == true) {
      this.vendorBranchObj.VendorObj.TaxIdNo = this.VendorForm.controls.TaxIdNo.value;
      this.vendorBranchObj.VendorObj.TaxpayerName = this.VendorForm.controls.TaxpayerName.value;

      this.vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.vendorBranchObj.VendorAddrObj.Addr = this.VendorForm.controls.Addr.value;
      this.vendorBranchObj.VendorAddrObj.Zipcode = this.VendorForm.controls["Zipcode"]["controls"].value.value;
      this.vendorBranchObj.VendorAddrObj.AreaCode2 = this.VendorForm.controls.AreaCode2.value;
      this.vendorBranchObj.VendorAddrObj.AreaCode1 = this.VendorForm.controls.AreaCode1.value;
      this.vendorBranchObj.VendorAddrObj.City = this.VendorForm.controls.City.value;
      this.vendorBranchObj.VendorAddrObj.Province = this.VendorForm.controls.Province.value;
    } else if (this.result != null) {
      this.vendorBranchObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
      this.vendorBranchObj.VendorAddrObj.Addr = this.result.VendorAddrObj.Addr;
      this.vendorBranchObj.VendorAddrObj.Zipcode = this.result.VendorAddrObj.Zipcode;
      this.vendorBranchObj.VendorAddrObj.AreaCode2 = this.result.VendorAddrObj.AreaCode2;
      this.vendorBranchObj.VendorAddrObj.AreaCode1 = this.result.VendorAddrObj.AreaCode1;
      this.vendorBranchObj.VendorAddrObj.City = this.result.VendorAddrObj.City;
      this.vendorBranchObj.VendorAddrObj.Province = this.result.VendorAddrObj.Province;
    }

    if (this.VendorForm['controls']['VendorAttrList'] != undefined){
      var formValue = this.VendorForm['controls']['VendorAttrList'].value;

      if (Object.keys(formValue).length > 0 && formValue.constructor === Object) {
        for (const key in formValue) {
          if (formValue[key]["VendorAttrValue"] != null) {
            var vendorAttr = new VendorAttrContentObj();
            vendorAttr.VendorAttrContentId = formValue[key]["VendorAttrContentId"];
            vendorAttr.VendorId = this.VendorId;
            vendorAttr.VendorAttrId = formValue[key]["VendorAttrId"];
            vendorAttr.AttrContent = formValue[key]["VendorAttrValue"];
            this.vendorAttrRequest.push(vendorAttr);
          }
        }
        this.vendorBranchObj.VendorAttrContentObjs = this.vendorAttrRequest;
      }
    }

    if (this.mode == "edit") {
      if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY) {
        this.vendorBranchObj.VendorObj.MrVendorTypeCode = this.result.VendorObj.MrVendorTypeCode;
      }
      this.vendorBranchObj.VendorObj.MrVendorCategoryCode = this.result.VendorObj.MrVendorCategoryCode;
      this.vendorBranchObj.VendorObj.VendorCode = this.result.VendorObj.VendorCode;
      this.vendorBranchObj.VendorObj.VendorId = this.VendorId;
      this.vendorBranchObj.VendorAddrObj.VendorAddrId = this.result.VendorAddrObj.VendorAddrId;
      this.vendorBranchObj.VendorObj.RowVersion = this.result.VendorObj.RowVersion;
      this.vendorBranchObj.VendorAddrObj.RowVersion = this.result.VendorAddrObj.RowVersion;

      this.http.post(URLConstant.EditVendorBranch, this.vendorBranchObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_BRANCH_REG],{ "VendorId": this.VendorId, "mode": "edit" });
        });
    }
    else {
      this.vendorBranchObj.MrVendorCategoryCode = this.MrVendorCategoryCode;
      this.vendorBranchObj.MrVendorTypeCode = this.MrVendorTypeCode;

      this.http.post(URLConstant.AddVendorBranch, this.vendorBranchObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_BRANCH_REG],{ "VendorId": response['VendorObj'].VendorId });
        });
    }
  }

  Back() {
    if (this.mode == "edit") {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_BRANCH_REG],{ "VendorId": this.VendorId });
    } else {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_PAGING],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
  }
  bindText() {
    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_BRANCH) {
      this.Registration = "SUPPLIER REGISTRATION";
      this.Code = "Supplier Code";
      this.Name = "Supplier Name";
    } else {
      this.Registration = "BRANCH REGISTRATION";
      this.Code = "Branch Code";
      this.Name = "Branch Name";
    }
  }

  getLookUpAttr(e, VendorAttrCode) {
    this.VendorForm['controls']["VendorAttrList"]["controls"][VendorAttrCode].patchValue({
      VendorAttrValue: e.MasterCode
    });
  }
}
