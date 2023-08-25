import { HttpClient } from "@angular/common/http";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import {environment} from '../../../environments/environment';
import { MatDialogRef } from "@angular/material/dialog";
import { ReqPersonalObj } from "../model/new-cust/req-personal-obj.model";
import { CustPersonalFamilyObj } from "../model/new-cust/cust-personal-family-obj.model";
import { CustPersonalJobDataObj } from "../model/cust-personal-job-data-obj.model";
import { CustAttrContentObj } from "../model/new-cust/cust-attr-content-obj.model";
import { Router } from "@angular/router";
import { CommonConstant } from "../constant/CommonConstant";
import { CustObj } from "../model/cust-obj.model";
import { CustPersonalObj } from "../model/cust-personal-obj.model";
import { CustAddrObj } from "../model/cust-addr-obj.model";
import { CustDocFileObj } from "../model/cust-doc-file/cust-doc-file-obj.model";
import { AdInsHelper } from "../AdInsHelper";

function SetCustomerDataMode(reqSubmitObj: ReqPersonalObj, Mode: string, From: string) {
    switch (Mode) {
      case CommonConstant.CustMainDataModeCust:
        SetIsTypeDataMode(reqSubmitObj, From);
        break;
      case CommonConstant.CustMainDataModeFamily:
        reqSubmitObj.CustObj.IsFamily = true;
        break;
      case CommonConstant.CustMainDataModeMgmntShrholder:
        reqSubmitObj.CustObj.IsShareholder = true;
        break;
    }
    return reqSubmitObj;
}

function SetIsTypeDataMode(reqSubmitObj: ReqPersonalObj, From: string) {
  if (this.pageFrom == CommonConstant.CustFromEditMainData) reqSubmitObj.CustObj.IsCustomer = true;
  if (this.pageFrom == CommonConstant.CustFromCustFamily) reqSubmitObj.CustObj.IsFamily = true;
  if (this.pageFrom == CommonConstant.CustFromCustShareholder) reqSubmitObj.CustObj.IsShareholder = true;
}

function SetCustPersonalFamilyData(dicts: Record<string, any>, MrCustRelationship: string) {
    let tempFamilyData: CustPersonalFamilyObj = new CustPersonalFamilyObj();
    tempFamilyData.RowVersion = dicts.RowVersionCustPersonalFamily;

    tempFamilyData.CustId = dicts.CustIdFamily;
    tempFamilyData.FamilyId = dicts.CustId;
    tempFamilyData.MrCustRelationship = MrCustRelationship;

    return tempFamilyData;
}

function SetCustPersonalJobData(parentForm: any, dicts: Record<string, any>, Mode: string) {
    let tempReqObj: CustPersonalJobDataObj = new CustPersonalJobDataObj();
    tempReqObj.CoyName = dicts.CoyName;
    tempReqObj.CustPersonalJobDataId = dicts.CustPersonalJobDataId;
    tempReqObj.EmpNo = dicts.EmpNo;
    tempReqObj.IsMfEmp = dicts.IsMfEmp;
    tempReqObj.IsWellknownCoy = dicts.IsWellknownCoy;
    tempReqObj.JobAddrId = dicts.JobAddrId;
    tempReqObj.JobTitleName = dicts.JobTitleName;
    tempReqObj.MrCoyScaleCode = dicts.MrCoyScaleCode;
    tempReqObj.MrInvestmentTypeCode = dicts.MrInvestmentTypeCode;
    tempReqObj.MrJobStatCode = dicts.MrJobStatCode;
    tempReqObj.MrWellknownCoyCode = dicts.MrWellknownCoyCode;
    tempReqObj.NoOfEmploy = dicts.NoOfEmploy;
    tempReqObj.OthBizAddrId = dicts.OthBizAddrId;
    tempReqObj.OthBizEstablishmentDt = dicts.OthBizEstablishmentDt;
    tempReqObj.OthBizIndustryTypeCode = dicts.OthBizIndustryTypeCode;
    tempReqObj.OthBizJobPosition = dicts.OthBizJobPosition;
    tempReqObj.OthBizName = dicts.OthBizName;
    tempReqObj.OthBizType = dicts.OthBizType;
    tempReqObj.PrevCoyName = dicts.PrevCoyName;
    tempReqObj.PrevEmploymentDt = dicts.PrevEmploymentDt;
    tempReqObj.PrevJobAddrId = dicts.PrevJobAddrId;
    tempReqObj.ProfessionalNo = dicts.ProfessionalNo;
    tempReqObj.RefIndustryTypeId = dicts.RefIndustryTypeId;
    tempReqObj.RowVersion = dicts.RowVersionPersonalJob;

    tempReqObj.CustId = dicts.CustId;

    tempReqObj.RefProfessionId = parentForm.RefProfessionId != 0 ? parentForm.RefProfessionId : null;
    tempReqObj.MrJobPositionCode = parentForm.MrJobPositionCode;
    if (Mode == CommonConstant.CustMainDataModeFamily) {
      tempReqObj.EmploymentEstablishmentDt = parentForm.EmploymentEstablishmentDt;
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode && !tempReqObj.EmploymentEstablishmentDt) tempReqObj = null;
    } else {
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode) tempReqObj = null;
    }
    return tempReqObj
}

function SetCustAttrContent(parentForm: any) {
    let tempAttr: Array<CustAttrContentObj> = new Array();
    for (let index = 0; index < parentForm.CustAttrForm.length; index++) {
      let tempAttrToPush: CustAttrContentObj = new CustAttrContentObj();
      tempAttrToPush.RefAttrId = parentForm.CustAttrForm[index].RefAttrId;
      tempAttrToPush.CustId = parentForm.CustAttrForm[index].CustId;
      tempAttrToPush.AttrValue = parentForm.CustAttrForm[index].AttrValue;
      tempAttr.push(tempAttrToPush);
    }
    return tempAttr;
  }

export function addEditCustAsset(parentForm: any, CustId: number, CustAssetId: number, api: any, RowVersion: any, http: HttpClient, toastr: NGXToastrService, DialogRef: MatDialogRef<any>)
{
    let url = environment.FoundationR3Url + api;
    let AssetTotalValue = parentForm.AssetValue * parentForm.AssetQty;

    let obj = {
        "AssetDescr" : parentForm.AssetDescr,
        "AssetQty" : parentForm.AssetQty,
        "AssetTotalValue" : AssetTotalValue,
        "CustAssetId": CustAssetId,
        "AssetValue": parentForm.AssetValue,
        "CustId": CustId,
        "MrCustAssetTypeCode": parentForm.MrCustAssetTypeCode,
        "RowVersion": RowVersion
    }

    http.post(url, obj).subscribe(
    (response: any) => {
        toastr.successMessage(response["message"]);
        DialogRef.close()
    })
}

export function addEditCustAddr(parentForm: any, CustId: number, CustAddrId: number, api: any, RowVersion: any, http: HttpClient, toastr: NGXToastrService, DialogRef: MatDialogRef<any>)
{
    let url = environment.FoundationR3Url + api;
    let FullAddr = parentForm.UcAddress.Addr + " RT: " + parentForm.UcAddress.AreaCode4 + " RW: " + parentForm.UcAddress.AreaCode3 + " " + parentForm.UcAddress.AreaCode2 + ", " + parentForm.UcAddress.AreaCode1 + " " + parentForm.UcAddress.Zipcode;

    let obj = {
        "CustAddrId": CustAddrId,
        "RowVersion": RowVersion,
        "CustId": CustId,
        "MrCustAddrTypeCode": parentForm.MrCustAddrTypeCode,
        "Addr": parentForm.UcAddress.Addr,
        "FullAddr": FullAddr,
        "AreaCode3": parentForm.UcAddress.AreaCode3,
        "AreaCode4": parentForm.UcAddress.AreaCode4,
        "Zipcode": parentForm.UcAddress.Zipcode,
        "AreaCode1": parentForm.UcAddress.AreaCode1,
        "AreaCode2": parentForm.UcAddress.AreaCode2,
        "City": parentForm.UcAddress.City,
        "PhnArea1": parentForm.UcAddress.PhnArea1,
        "Phn1": parentForm.UcAddress.Phn1,
        "PhnExt1": parentForm.UcAddress.PhnExt1,
        "PhnArea2": parentForm.UcAddress.PhnArea2,
        "Phn2": parentForm.UcAddress.Phn2,
        "PhnExt2": parentForm.UcAddress.PhnExt2,
        "PhnArea3": parentForm.UcAddress.PhnArea3,
        "Phn3": parentForm.UcAddress.Phn3,
        "PhnExt3": parentForm.UcAddress.PhnExt3,
        "FaxArea": parentForm.UcAddress.FaxArea,
        "Fax": parentForm.UcAddress.Fax,
        "MrBuildingOwnershipCode": parentForm.UcAddress.MrHouseOwnershipCode,
        "Notes": parentForm.Notes
    }

    http.post(url, obj).subscribe(
    (response: any) => {
        toastr.successMessage(response["message"]);
        DialogRef.close()
    })
}

export function editCustomer(parentForm: any, dicts: Record<string, any>, Mode: string, From: string, next: string, api: any, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = environment.FoundationR3Url + api;

    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();

    reqSubmitObj.CustDocFileObjs = new Array<CustDocFileObj>();

    reqSubmitObj.CustObj = new CustObj();
    reqSubmitObj.CustObj.CustId = dicts.CustId;
    reqSubmitObj.CustObj.CustNo = dicts.CustNo;
    reqSubmitObj.CustObj.IsAffiliateWithMf = dicts.IsAffiliateWithMf;
    reqSubmitObj.CustObj.IsCustomer = dicts.IsCustomer;
    reqSubmitObj.CustObj.IsFamily = dicts.IsFamily;
    reqSubmitObj.CustObj.IsGuarantor = dicts.IsGuarantor;
    reqSubmitObj.CustObj.IsShareholder = dicts.IsShareholder;;
    reqSubmitObj.CustObj.OriginalOfficeCode = dicts.OriginalOfficeCode;
    reqSubmitObj.CustObj.RowVersion = dicts.RowVersionCust;
    reqSubmitObj.CustObj.ThirdPartyTrxNo = dicts.ThirdPartyTrxNo;
    reqSubmitObj.CustObj.VipNotes = dicts.VipNotes;

    reqSubmitObj.CustObj.CustName = parentForm.CustName;
    reqSubmitObj.CustObj.MrIdTypeCode = parentForm.MrIdTypeCode;
    reqSubmitObj.CustObj.IdNo = parentForm.IdNo;
    reqSubmitObj.CustObj.IdExpiredDt = parentForm.IdExpiredDt;
    reqSubmitObj.CustObj.TaxIdNo = parentForm.TaxIdNo;
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustomerPersonal;
    reqSubmitObj.CustObj.MrCustModelCode = parentForm.MrCustModelCode;
    reqSubmitObj.CustObj.ThirdPartyTrxNo = dicts.thirdPartyTrxNo;
    
    reqSubmitObj.CustPersonalObj = new CustPersonalObj();
    reqSubmitObj.CustPersonalObj.CustId = dicts.CustId;
    reqSubmitObj.CustPersonalObj.CustPersonalId = dicts.CustPersonalId;
    reqSubmitObj.CustPersonalObj.CustPrefixName = dicts.CustPrefixName;
    reqSubmitObj.CustPersonalObj.CustSuffixName = dicts.CustSuffixName;
    reqSubmitObj.CustPersonalObj.Email2 = dicts.Email2;
    reqSubmitObj.CustPersonalObj.Email3 = dicts.Email3;
    reqSubmitObj.CustPersonalObj.FamilyCardNo = dicts.FamilyCardNo;
    reqSubmitObj.CustPersonalObj.IsRestInPeace = dicts.IsRestInPeace;

    reqSubmitObj.CustPersonalObj.MobilePhnNo2 = dicts.MobilePhnNo2;
    reqSubmitObj.CustPersonalObj.MobilePhnNo3 = dicts.MobilePhnNo3;
    reqSubmitObj.CustPersonalObj.MrEducationCode = dicts.MrEducationCode;
    reqSubmitObj.CustPersonalObj.MrReligionCode = dicts.MrReligionCode;
    reqSubmitObj.CustPersonalObj.MrSalutationCode = dicts.MrSalutationCode;
    reqSubmitObj.CustPersonalObj.NickName = dicts.NickName;
    reqSubmitObj.CustPersonalObj.NoOfDependents = dicts.NoOfDependents;
    reqSubmitObj.CustPersonalObj.NoOfResidence = dicts.NoOfResidence;
    reqSubmitObj.CustPersonalObj.RowVersion = dicts.RowVersionCustPersonal;

    reqSubmitObj.CustPersonalObj.CustFullName = parentForm.CustName;
    reqSubmitObj.CustPersonalObj.MrGenderCode = parentForm.MrGenderCode;
    reqSubmitObj.CustPersonalObj.BirthPlace = parentForm.BirthPlace;
    reqSubmitObj.CustPersonalObj.BirthDt = parentForm.BirthDt;
    reqSubmitObj.CustPersonalObj.MotherMaidenName = parentForm.MotherMaidenName;
    reqSubmitObj.CustPersonalObj.MrMaritalStatCode = parentForm.MrMaritalStatCode;
    reqSubmitObj.CustPersonalObj.Email1 = parentForm.Email1;
    reqSubmitObj.CustPersonalObj.MobilePhnNo1 = parentForm.MobilePhnNo1;
    if (Mode == CommonConstant.CustMainDataModeFamily) {
      reqSubmitObj.CustPersonalObj.MrNationalityCode = parentForm.MrNationalityCode;
      reqSubmitObj.CustPersonalObj.WnaCountryCode = parentForm.WnaCountryCode;
      reqSubmitObj.CustPersonalFamilyObj = SetCustPersonalFamilyData(dicts, parentForm.MrCustRelationship);
    }

    reqSubmitObj.CustAddr = new CustAddrObj();
    reqSubmitObj.CustAddr.CustAddrId = dicts.CustAddrId;
    reqSubmitObj.CustAddr.Fax = dicts.Fax;
    reqSubmitObj.CustAddr.FaxArea = dicts.FaxArea;
    reqSubmitObj.CustAddr.Notes = dicts.Notes;
    reqSubmitObj.CustAddr.Phn1 = dicts.Phn1;
    reqSubmitObj.CustAddr.Phn2 = dicts.Phn2;
    reqSubmitObj.CustAddr.Phn3 = dicts.Phn3;
    reqSubmitObj.CustAddr.PhnArea1 = dicts.PhnArea1;
    reqSubmitObj.CustAddr.PhnArea2 = dicts.PhnArea2;
    reqSubmitObj.CustAddr.PhnArea3 = dicts.PhnArea3;
    reqSubmitObj.CustAddr.PhnExt1 = dicts.PhnExt1;
    reqSubmitObj.CustAddr.PhnExt2 = dicts.PhnExt2;
    reqSubmitObj.CustAddr.PhnExt3 = dicts.PhnExt3;
    reqSubmitObj.CustAddr.RowVersion = dicts.RowVersionAddress;
    reqSubmitObj.CustAddr.StayLength = dicts.StayLength;
    reqSubmitObj.CustAddr.StaySince = dicts.StaySince;

    reqSubmitObj.CustAddr.CustId = dicts.CustId;
    reqSubmitObj.CustAddr.Addr = parentForm.UcAddress.Addr;
    reqSubmitObj.CustAddr.AreaCode1 = parentForm.UcAddress.AreaCode1;
    reqSubmitObj.CustAddr.AreaCode2 = parentForm.UcAddress.AreaCode2;
    reqSubmitObj.CustAddr.AreaCode3 = parentForm.UcAddress.AreaCode3;
    reqSubmitObj.CustAddr.AreaCode4 = parentForm.UcAddress.AreaCode4;
    reqSubmitObj.CustAddr.City = parentForm.UcAddress.City;
    reqSubmitObj.CustAddr.MrBuildingOwnershipCode = parentForm.UcAddress.MrHouseOwnershipCode;
    reqSubmitObj.CustAddr.Zipcode = parentForm.UcAddress.Zipcode;
    reqSubmitObj.CustAddr.SubZipcode = parentForm.UcAddress.SubZipcode;
    reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

    if (Mode != CommonConstant.CustMainDataModeCust) {
      reqSubmitObj.CustPersonalJobObj = new CustPersonalJobDataObj();
      reqSubmitObj.CustPersonalJobObj = SetCustPersonalJobData(parentForm, dicts, Mode);

      reqSubmitObj.CustAttrContentObjs = new Array<CustAttrContentObj>();
      reqSubmitObj.CustAttrContentObjs = SetCustAttrContent(parentForm);
    }

    reqSubmitObj = SetCustomerDataMode(reqSubmitObj, Mode, From);

    http.post(url, reqSubmitObj).subscribe(
      (response: any) => {
          toastr.successMessage(response["message"]);
          AdInsHelper.RedirectUrl(router, [next]);
      })
}

export function addCustToDuplicate(parentForm: any, dicts: Record<string, any>, next: string, api: any, router: Router)
{
  dicts["AddCustForm"] = parentForm;
  AdInsHelper.RedirectUrl(router, [next]);
}