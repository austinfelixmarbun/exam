import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { OfficeObj } from 'app/shared/model/office-obj.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RefMasterObj } from 'app/shared/model/ref-master-obj.model';
import { OrgMdlObj } from 'app/shared/model/org-mdl-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { UcDropdownListCallbackObj, UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { UclookupgenericComponent } from '@adins/uclookupgeneric';


@Component({
  selector: 'app-office-add',
  templateUrl: './office-add.component.html',
  providers: [NGXToastrService]
})
export class OfficeAddComponent implements OnInit {

  // @ViewChild(UcAddressComponent) ucAddr;
  // @ViewChild(UcContactInfoComponent) ucContact;
  // @ViewChild('ParentId') test: ElementRef;
  inputFieldAddr: InputFieldObj = new InputFieldObj();
  pageType: string = "add";
  mrKonvenSyariah = 'KON';
  isDisabledState: boolean = false;
  isHO: boolean = true;
  RefOfficeId: number;
  allOfficeType: any;
  allOfficeClass: any;
  allRefOrg: any;
  allOrgMdl: any;
  allKonSya: any;
  allOfficeParent: any;
  allRefOfficeArea: any;
  allHolidaySchm: any;
  allWorkingHourSchm: any;
  allRefTaxOffice: any;
  allCgType: any;
  lookupOfficeType: any;
  mrCgType: any;
  MrOfficeClassCode: any;
  mrOfficeType: any;
  refOrgId: any;
  orgMdlId: any;
  parentId: any;
  refOfficeAreaId: any = '';
  holidaySchmHId: any;
  workingHourSchmHId: any;
  hierarchyNo: any;
  officeCode: any;
  officeName: any;
  officeShortName: any;
  resultData: any;
  isActive: boolean = true;
  isAllowAppCreated: boolean = true;
  officeObj: OfficeObj;
  arrCrit: any;

  
  resultDataLawCourt: any;

  cbIsNationalCourt: boolean;

  OfficeForm = this.fb.group({
    OfficeCode: ['', Validators.required],
    OfficeName: ['', Validators.required],
    OfficeShortName: [''],
    OfficeType: ['', Validators.required],
    OfficeParent: ['', Validators.required],
    KonSya: ['', Validators.required],
    MrOfficeClassCode: ['', Validators.required],
    HolidayScheme: ['', Validators.required],
    WorkingHourScheme: ['', Validators.required],
    MrCenterGrpTypeCode: ['', Validators.required],
    CntctPersonName: ['', Validators.required],
    CntctPersonJobTitle: ['', Validators.required],
    CntctPersonEmail1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]],
    CntctPersonEmail2: ['', Validators.pattern(CommonConstant.regexEmail)],
    CntctPersonMobilePhnNo1: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    CntctPersonMobilePhnNo2: ['', [Validators.pattern('^[0-9]+$')]],
    HierarchyLvl: ['', Validators.required],
    IsActive: false,
    IsHaveCashier: false,
    OfficeClose: false,
    AllowAppCreated: false,
    IsNationalCourt: false,
    NationalCourtOffice: [''],
    TaxOffice: ['']
  })
  InputLookupObj: InputLookupObj = new InputLookupObj();
  listCriteriaTemp: Array<CriteriaObj> = new Array();
  addressObj: UcAddressObj = new UcAddressObj();
  inputAddressObj: InputAddressObj = new InputAddressObj();

  readonly CancelLink: string = NavigationConstant.OFFICE_PAGING;
  responseRefOfficeX: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.pageType = params['mode'];
      }
      if (params['RefOfficeId'] != null) {
        this.RefOfficeId = params['RefOfficeId'];
      }
    });
  }
  async ngOnInit() {
    this.InputLookupObj.urlJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupObj.isRequired = true;
    this.InputLookupObj.addCritInput = new Array();

    await this.GetGsMaxHierarchyLvl();
    if (this.RefOfficeId != undefined && this.RefOfficeId != 0) {
      let critRefOfficeIdObj = new CriteriaObj();
      critRefOfficeIdObj.restriction = AdInsConstant.RestrictionNeq;
      critRefOfficeIdObj.propName = 'A.REF_OFFICE_ID';
      critRefOfficeIdObj.value = this.RefOfficeId.toString();
      this.listCriteriaTemp.push(critRefOfficeIdObj);
      this.InputLookupObj.addCritInput.push(critRefOfficeIdObj);
    }

    await this.GetMasterData();
    if (this.pageType == "edit") {
      this.OfficeForm.controls["OfficeCode"].disable();
      this.OfficeForm.controls["OfficeType"].disable();
      this.OfficeForm.controls["MrCenterGrpTypeCode"].disable();
      this.isDisabledHierarchyLvlDdl = "true";
      this.officeObj = new OfficeObj();
      this.addressObj = new UcAddressObj();
      this.officeObj.RefOfficeId = this.RefOfficeId;
      await this.httpClient.post(URLConstant.GetRefOfficeByRefOfficeId, { Id: this.RefOfficeId }).toPromise().then(
        (response) => {
          this.resultData = response;
          
          this.InputLookupObj.jsonSelect = { OfficeCode: this.resultData.ParentOfficeCode, RefOfficeId: this.resultData.ParentId };
          this.InputLookupObj.nameSelect = this.resultData["ParentOfficeCode"];
          this.InputLookupObj.jsonSelect = { OfficeCode: this.resultData["ParentOfficeCode"] };
          this.OfficeForm.patchValue({
            OfficeCode: this.resultData.OfficeCode,
            OfficeName: this.resultData.OfficeName,
            OfficeParent: this.resultData.ParentId,
            OfficeType: this.resultData.MrOfficeTypeCode,
            OfficeShortName: this.resultData.OfficeShortName,
            MrCenterGrpTypeCode: this.resultData.MrCenterGrpTypeCode,
            MrOfficeClassCode: this.resultData.MrOfficeClassCode,
            KonSya: this.resultData.MrKonvenSyariahCode,
            HolidayScheme: this.resultData.HolidaySchmHId,
            WorkingHourScheme: this.resultData.WorkingHourSchmHId,
            IsActive: this.resultData.IsActive,
            IsHaveCashier: this.resultData.IsHaveCashier,
            OfficeClose: this.resultData.IsOfficeClose,
            AllowAppCreated: this.resultData.IsAllowAppCreated,
            CntctPersonName: this.resultData.CntctPersonName,
            CntctPersonJobTitle: this.resultData.CntctPersonJobTitle,
            CntctPersonEmail1: this.resultData.CntctPersonEmail1,
            CntctPersonEmail2: this.resultData.CntctPersonEmail2,
            CntctPersonMobilePhnNo1: this.resultData.CntctPersonMobilePhnNo1,
            CntctPersonMobilePhnNo2: this.resultData.CntctPersonMobilePhnNo2,
            HierarchyLvl: this.resultData.HierarchyLvl.toString(),
            // TaxOffice: this.resultData.RefTaxOfficeXId,
            // IsNationalCourt: this.resultData.IsNationalCourt,
            // NationalCourtOffice: this.resultData.NationalCourtOffice
          });
          let critObj = new CriteriaObj();
          critObj.restriction = AdInsConstant.RestrictionEq;
          critObj.propName = 'A.HIERARCHY_LVL';
          critObj.value = this.resultData.HierarchyLvl - 1;
          this.InputLookupObj.addCritInput.push(critObj);

          this.addressObj.Addr = this.resultData.OfficeAddr;
          this.addressObj.AreaCode4 = this.resultData.AreaCode4;
          this.addressObj.AreaCode3 = this.resultData.AreaCode3;
          this.addressObj.AreaCode2 = this.resultData.AreaCode2;
          this.addressObj.AreaCode1 = this.resultData.AreaCode1;
          this.addressObj.City = this.resultData.City;
          this.addressObj.PhnArea1 = this.resultData.PhnArea1;
          this.addressObj.Phn1 = this.resultData.Phn1;
          this.addressObj.PhnExt1 = this.resultData.PhnExt1
          this.addressObj.PhnArea2 = this.resultData.PhnArea2
          this.addressObj.Phn2 = this.resultData.Phn2
          this.addressObj.PhnExt2 = this.resultData.PhnExt2
          this.addressObj.PhnArea3 = this.resultData.PhnArea3
          this.addressObj.Phn3 = this.resultData.Phn3
          this.addressObj.PhnExt3 = this.resultData.PhnExt3
          this.addressObj.FaxArea = this.resultData.FaxArea
          this.addressObj.Fax = this.resultData.Fax
          this.inputFieldAddr.inputLookupObj = new InputLookupObj();
          this.inputFieldAddr.inputLookupObj.jsonSelect = { Zipcode: this.resultData.Zipcode };
          this.inputFieldAddr.inputLookupObj.nameSelect = this.resultData.Zipcode;

          this.cbIsNationalCourt = this.resultData.IsNationalCourt;

          if (this.cbIsNationalCourt == true) {
            this.OfficeForm.controls.NationalCourtOffice.enable()
            this.OfficeForm.controls.NationalCourtOffice.clearValidators();
            this.OfficeForm.controls.NationalCourtOffice.setValidators([Validators.required]);
          } else {
            this.OfficeForm.controls.NationalCourtOffice.disable()
            this.OfficeForm.controls.NationalCourtOffice.clearValidators();
          }
          this.OfficeForm.controls.NationalCourtOffice.updateValueAndValidity();
        })
    }
    this.checkType();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.default = this.addressObj;
    this.inputAddressObj.inputField = this.inputFieldAddr;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
    this.HierarchyLvlDdl.isCustomList = true;
    this.HierarchyLvlDdl.isSelectOutput = true;
    this.HierarchyLvlDdl.isReady = true;
    this.InputLookupObj.isReady = true;
  }

  async GetMasterData() {
    let isAdd: boolean = this.pageType == "add";

    await this.httpClient.post(URLConstant.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeOfficeType }).toPromise().then(
      (response) => {
        if (response['RefMasterObjs'].length > 0) {
          this.lookupOfficeType = response['RefMasterObjs'];
          let critObj = new CriteriaObj();
          critObj.restriction = AdInsConstant.RestrictionIn;
          critObj.propName = 'MR_OFFICE_TYPE_CODE';
          critObj.listValue = new Array();
          this.lookupOfficeType.forEach(element => {
            critObj.listValue.push(element.MasterCode);
          });
          this.listCriteriaTemp.push(critObj);
          this.InputLookupObj.addCritInput.push(critObj);
        }
      });
    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeOfficeClass}).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allOfficeClass = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              MrOfficeClassCode: this.allOfficeClass[0].Key
            });
          }
        }
      });

    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCenterGrpType}).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allCgType = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              MrCenterGrpTypeCode: this.allCgType[0].Key
            });
          }
        }

      });
    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeKonvenSyariah}).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allKonSya = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              KonSya: this.allKonSya[0].Key
            });
          }
        }
      });
    this.httpClient.post(URLConstant.GetRefMasterListKeyValueActiveByCode, {RefMasterTypeCode: CommonConstant.RefMasterTypeCodeOfficeType}).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allOfficeType = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              OfficeType: this.allOfficeType[0].Key
            });
          }
        }
      });
    this.httpClient.post(URLConstant.GetListActiveHolidaySchemeH, null).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allHolidaySchm = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              HolidayScheme: this.allHolidaySchm[0].HolidaySchmHId
            });
          }
        }
      });
    this.httpClient.post(URLConstant.GetListActiveWorkingSchmH, null).subscribe(
      (response) => {
        if (response[CommonConstant.ReturnObj].length > 0) {
          this.allWorkingHourSchm = response[CommonConstant.ReturnObj];
          if (isAdd) {
            this.OfficeForm.patchValue({
              WorkingHourScheme: this.allWorkingHourSchm[0].WorkingHourSchmHId
            });
          }
        }
      });
  }

  MaxHierarchyLvl: number = 0;
  HierarchyLvlDdl: UcDropdownListObj = new UcDropdownListObj();
  isDisabledHierarchyLvlDdl: string = '';
  listMaxHierarchyLvl: Array<KeyValueObj> = new Array();
  async GetGsMaxHierarchyLvl() {
    await this.httpClient.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeMaxHierarchyLvlOffice }).toPromise().then(
      (response: {GsValue: string}) => {
        this.MaxHierarchyLvl = +response.GsValue;
      }
    )
  }

  SetListMaxHierarchyLvl() {
    let isHo: boolean = this.OfficeForm.get("OfficeType").value == CommonConstant.HeadOffice;
    this.listMaxHierarchyLvl = new Array();
    let tempHierarchyLvl: AbstractControl = this.OfficeForm.get("HierarchyLvl");
    if (isHo) {
      this.listMaxHierarchyLvl.push(this.SetKeyValueObjHierarchyLvl(1));
      if (this.pageType != "edit") setTimeout(() => {
        tempHierarchyLvl.setValue("1");
      }, 500);
      return;
    }
    for (let index = 2; index <= this.MaxHierarchyLvl; index++) {
      this.listMaxHierarchyLvl.push(this.SetKeyValueObjHierarchyLvl(index));
    }
    if (this.pageType != "edit") tempHierarchyLvl.setValue("");
  }

  SetKeyValueObjHierarchyLvl(HierarchyLvl: number): KeyValueObj {
    let tempKeyValueObj: KeyValueObj = new KeyValueObj();
    tempKeyValueObj.Key = HierarchyLvl.toString();
    tempKeyValueObj.Value = HierarchyLvl.toString();
    return tempKeyValueObj;
  }
  
  private ucLookupParent: UclookupgenericComponent;
  @ViewChild('LookupParent') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupParent = content;
    }
  }

  changeHierarchy(ev: UcDropdownListCallbackObj) {
    let selectedValue = ev.selectedObj;
    let listTempCritObj: Array<CriteriaObj> = new Array();
    for (let index = 0; index < this.listCriteriaTemp.length; index++) {
      const element = this.listCriteriaTemp[index];
      listTempCritObj.push(element);
    }
    //#region resetValue parent
    this.InputLookupObj.jsonSelect = { OfficeCode: "", RefOfficeId: 0 };
    this.InputLookupObj.nameSelect = "";
    this.InputLookupObj.jsonSelect = { OfficeCode: "" };
    this.OfficeForm.patchValue({ OfficeParent: 0 });
    //#endregion
    let critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'A.HIERARCHY_LVL';
    critObj.value = +selectedValue["Key"] - 1;
    listTempCritObj.push(critObj);
    this.InputLookupObj.addCritInput = listTempCritObj;
    this.ucLookupParent.setAddCritInput();
  }

  SaveForm(): void {
    this.officeObj = new OfficeObj();
    this.officeObj.RowVersion = "";

    let tempOfficeForm = this.OfficeForm.getRawValue();
    this.officeObj.OfficeCode = tempOfficeForm.OfficeCode;
    this.officeObj.OfficeShortName = tempOfficeForm.OfficeShortName;
    this.officeObj.OfficeName = tempOfficeForm.OfficeName;
    this.officeObj.MrOfficeClassCode = tempOfficeForm.MrOfficeClassCode;
    this.officeObj.IsActive = tempOfficeForm.IsActive;
    this.officeObj.IsHaveCashier = tempOfficeForm.IsHaveCashier;
    this.officeObj.IsAllowAppCreated = tempOfficeForm.AllowAppCreated;
    this.officeObj.HolidaySchmHId = tempOfficeForm.HolidayScheme;
    this.officeObj.WorkingHourSchmHId = tempOfficeForm.WorkingHourScheme;
    this.officeObj.MrKonvenSyariahCode = tempOfficeForm.KonSya;
    this.officeObj.MrOfficeTypeCode = tempOfficeForm.OfficeType;
    this.officeObj.IsOfficeClose = tempOfficeForm.OfficeClose;
    this.officeObj.CntctPersonName = tempOfficeForm.CntctPersonName;
    this.officeObj.CntctPersonJobTitle = tempOfficeForm.CntctPersonJobTitle;
    
    this.officeObj.ParentId = tempOfficeForm.OfficeParent;
    this.officeObj.HierarchyLvl = tempOfficeForm.HierarchyLvl;
    if (this.officeObj.MrOfficeTypeCode == CommonConstant.HeadOffice) {
      this.officeObj.ParentId = null;
      this.officeObj.HierarchyLvl = 1;
    }

    this.officeObj.MrCenterGrpTypeCode = "";
    if (this.officeObj.MrOfficeTypeCode == CommonConstant.CollectionGroup) {
      this.officeObj.MrCenterGrpTypeCode = tempOfficeForm.MrCenterGrpTypeCode;
    }

    this.officeObj.CntctPersonEmail1 = tempOfficeForm.CntctPersonEmail1;
    this.officeObj.CntctPersonEmail2 = tempOfficeForm.CntctPersonEmail2;
    this.officeObj.CntctPersonMobilePhnNo1 = tempOfficeForm.CntctPersonMobilePhnNo1;
    this.officeObj.CntctPersonMobilePhnNo2 = tempOfficeForm.CntctPersonMobilePhnNo2;

    this.officeObj.OfficeAddr = tempOfficeForm.UcAddress.Addr;
    this.officeObj.AreaCode4 = tempOfficeForm.UcAddress.AreaCode4;
    this.officeObj.AreaCode3 = tempOfficeForm.UcAddress.AreaCode3;
    this.officeObj.AreaCode2 = tempOfficeForm.UcAddress.AreaCode2;
    this.officeObj.AreaCode1 = tempOfficeForm.UcAddress.AreaCode1;
    this.officeObj.City = tempOfficeForm.UcAddress.City;
    this.officeObj.ZipCode = tempOfficeForm.UcAddressZipcode.value;
    this.officeObj.PhnArea1 = tempOfficeForm.UcAddress.PhnArea1;
    this.officeObj.Phn1 = tempOfficeForm.UcAddress.Phn1;
    this.officeObj.PhnExt1 = tempOfficeForm.UcAddress.PhnExt1;
    this.officeObj.PhnArea2 = tempOfficeForm.UcAddress.PhnArea2;
    this.officeObj.Phn2 = tempOfficeForm.UcAddress.Phn2;
    this.officeObj.PhnExt2 = tempOfficeForm.UcAddress.PhnExt2;
    this.officeObj.PhnArea3 = tempOfficeForm.UcAddress.PhnArea3;
    this.officeObj.Phn3 = tempOfficeForm.UcAddress.Phn2;
    this.officeObj.PhnExt2 = tempOfficeForm.UcAddress.PhnExt3;
    this.officeObj.FaxArea = tempOfficeForm.UcAddress.FaxArea;
    this.officeObj.Fax = tempOfficeForm.UcAddress.Fax;

    if (this.pageType == "add") {
      this.httpClient.post(URLConstant.AddRefOfficeV2, this.officeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);

          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.OFFICE_PAGING], {});
        }
      );
    }
    else {
      this.officeObj.OfficeCode = this.resultData.OfficeCode;
      this.officeObj.MrOfficeTypeCode = this.resultData.MrOfficeTypeCode
      this.officeObj.RefOfficeId = this.resultData.RefOfficeId;
      this.officeObj.RowVersion = this.resultData.RowVersion;
      this.httpClient.post(URLConstant.EditRefOfficeV2, this.officeObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);

          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.OFFICE_PAGING], {});
        }
      );

    }
  }
  checkType() {
    if (this.OfficeForm.controls.OfficeType.value == CommonConstant.HeadOffice) {
      this.OfficeForm.patchValue({
        OfficeParent: null
      });
      this.InputLookupObj.isRequired = false;
      this.OfficeForm.controls.OfficeParent.clearValidators();
      this.OfficeForm.controls.OfficeParent.updateValueAndValidity();
    }
    else {
      this.InputLookupObj.isRequired = true;
      this.OfficeForm.controls.OfficeParent.setValidators([Validators.required]);
      this.OfficeForm.controls.OfficeParent.updateValueAndValidity();
    }
    this.SetListMaxHierarchyLvl();
  }
  toggleActive(e) {
    this.isActive = e.target.checked;
  }

  toggleAllowAppCreated(e) {
    this.isAllowAppCreated = e.target.checked;
  }
  getLookUp(ev) {
    this.OfficeForm.patchValue({
      OfficeParent: ev.RefOfficeId
    })
  }

  IsNationalCourtChange() {
    if (this.cbIsNationalCourt === true) {
      this.OfficeForm.controls.NationalCourtOffice.enable()
      this.OfficeForm.controls.NationalCourtOffice.clearValidators();
      this.OfficeForm.controls.NationalCourtOffice.setValidators([Validators.required]);
    } else {
      this.OfficeForm.controls.NationalCourtOffice.setValue("");
      this.OfficeForm.controls.NationalCourtOffice.disable()
      this.OfficeForm.controls.NationalCourtOffice.clearValidators();
    }
    this.OfficeForm.controls.NationalCourtOffice.updateValueAndValidity();
  }


}
