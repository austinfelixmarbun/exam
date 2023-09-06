import { AdInsHelper } from "../AdInsHelper";
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { Router } from "@angular/router";
import { VendorHoObj } from 'app/shared/model/vendor-ho-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { CommonConstant } from "../constant/CommonConstant";
import { VendorAttrContentObj } from "../model/vendor-attr-content-obj.model";
import { VendorAtpmMappingObj } from "../model/vendor-atpm-mapping-obj.model";
import { GenericObj } from "../model/generic/generic-obj.model";
import { AdInsConstant } from "../AdInstConstant";
import { NavigationConstant } from "../NavigationConstant";

function getVendorId(listTemp: any)
{
    let listId = [];
    
    listTemp.forEach(x => {
    listId.push(x.VendorId)});
    
    return listId;
}

function getRefOfficeId(listTemp: any)
{
    let listId = [];
    
    listTemp.forEach(x => {
    listId.push(x.RefOfficeId)});
    
    return listId;
}



export function addRangeVendorMbr(listTemp: any, VendorId: number, api: any, next: string, from: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let listId = getVendorId(listTemp);
  let obj = {};
  let param = {};
  let url = environment.FoundationR3Url + api;

  if (from == "SUPPLIER_SCHM")
  {
    obj = {
        "VendorId": listId,
        "VendorSchmId": VendorId,
    }

    param = {
        "VendorSchmId": VendorId,
        "MrVendorCategoryCode": "SUPPLIER"
    }
  }

  if (from == "SUPPLIER_GRP")
  {
    obj = {
        "VendorId": listId,
        "VendorGrpId": VendorId,
    }

    param = {
        "VendorGrpId": VendorId,
        "MrVendorCategoryCode": "SUPPLIER"
    }
  }

  if (from == "SUPPLIER_OFFICE_MEMBER")
  {
    obj = {
        "RefOfficeId": listId,
        "VendorId": VendorId,
    }

    param = {
        "VendorId": VendorId,
    }
  }

  http.post(url, obj).subscribe(
    (response: any) => {
        toastr.successMessage("Success!");
        AdInsHelper.RedirectUrl(router, [next], param);
    })
}

export function addRangeVendorGrpMbr(listTemp: any, VendorId: number, api: any, next: string, MrVendorCategoryCode: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
    let listId = getVendorId(listTemp);
    let obj = {};
    let param = {};
    let url = environment.FoundationR3Url + api;
  
    obj = {
        "VendorId": listId,
        "VendorGrpId": VendorId,
    }

    param = {
        "VendorGrpId": VendorId,
        "MrVendorCategoryCode": MrVendorCategoryCode
    }
  
    http.post(url, obj).subscribe(
      (response: any) => {
          toastr.successMessage("Success!");
          AdInsHelper.RedirectUrl(router, [next], param);
      })
  }

export function addRangeOfficeMbr(listTemp: any, VendorId: number, api: any, next: string, http: HttpClient, toastr: NGXToastrService, router: Router) {
    let listId = getRefOfficeId(listTemp);
    let obj = {};
    let param = {};
    let url = environment.FoundationR3Url + api;
  
    obj = {
        "RefOfficeId": listId,
        "VendorId": VendorId,
    }

    param = {
        "VendorId": VendorId,
    }
  
    http.post(url, obj).subscribe(
      (response: any) => {
          toastr.successMessage("Success!");
          AdInsHelper.RedirectUrl(router, [next], param);
      })
}

export function cancelHORegistration(dicts: Record<string, any>, router: Router)
{
    if (dicts.mode != undefined && dicts.mode == "edit")
    {
        AdInsHelper.RedirectUrl(router, [NavigationConstant.SELF_CUSTOM_VENDOR_HO_REG], { "VendorId": dicts.VendorId, "mode": "edit", "MrVendorCategoryCode": dicts.MrVendorCategoryCode });
    }
    else
    {
        AdInsHelper.RedirectUrl(router, [NavigationConstant.VENDOR_PAGING], { "MrVendorCategoryCode": dicts.MrVendorCategoryCode });
    }
}

export function addEditvendorHO(dicts: Record<string, any>, api: string, next: string, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = environment.FoundationR3Url + api;

    let vendorHoObj = new VendorHoObj();

    vendorHoObj.VendorObj = new VendorObj();
    vendorHoObj.VendorObj.Email = dicts.formRaw.Email;
    vendorHoObj.VendorObj.EstablishmentDt = dicts.formRaw.EstablishmentDt;
    vendorHoObj.VendorObj.IdNo = dicts.formRaw.IdNo;
    vendorHoObj.VendorObj.IsActive = dicts.formRaw.IsActive;
    vendorHoObj.VendorObj.IsNpwpExist = dicts.formRaw.IsNpwpExist;
    vendorHoObj.VendorObj.IsOneAffiliate = dicts.formRaw.IsOneAffiliate;
    vendorHoObj.VendorObj.IsVat = dicts.formRaw.IsVat;
    vendorHoObj.VendorObj.LicenseNo = dicts.formRaw.LicenseNo;
    vendorHoObj.VendorObj.MobilePhnNo1 = dicts.formRaw.MobilePhnNo1;
    vendorHoObj.VendorObj.MobilePhnNo2 = dicts.formRaw.MobilePhnNo2;
    vendorHoObj.VendorObj.MrIdTypeCode = dicts.formRaw.MrIdTypeCode;
    vendorHoObj.VendorObj.MrTaxCalcMethodCode = dicts.formRaw.MrTaxCalcMethodCode;
    vendorHoObj.VendorObj.MrVendorCategoryCode = dicts.formRaw.MrVendorCategoryCode;
    vendorHoObj.VendorObj.MrVendorClass = CommonConstant.HeadOffice;
    vendorHoObj.VendorObj.MrVendorTypeCode = dicts.formRaw.MrVendorTypeCode;
    vendorHoObj.VendorObj.PartnershipDt = dicts.formRaw.PartnershipDt;
    vendorHoObj.VendorObj.RegistrationNo = dicts.formRaw.RegistrationNo;
    vendorHoObj.VendorObj.VendorCode = dicts.formRaw.VendorCode;
    vendorHoObj.VendorObj.VendorName = dicts.formRaw.VendorName;
    // vendorHoObj.VendorObj.VendorParentId = dicts.VendorParentId;
    vendorHoObj.VendorObj.VendorRating = dicts.formRaw.VendorRating;

    vendorHoObj.VendorAddrObj = new VendorAddrObj();
    vendorHoObj.VendorAddrObj.MrAddrTypeCode = "";
    vendorHoObj.VendorAddrObj.Addr = "";
    vendorHoObj.VendorAddrObj.Zipcode = "";
    vendorHoObj.VendorAddrObj.AreaCode2 = "";
    vendorHoObj.VendorAddrObj.AreaCode1 = "";
    vendorHoObj.VendorAddrObj.City = "";
    vendorHoObj.VendorAddrObj.Province = "";

    if (dicts.formRaw.IsNpwpExist == true)
    {
        vendorHoObj.VendorObj.TaxIdNo = dicts.formRaw.TaxIdNo;
        vendorHoObj.VendorObj.TaxpayerName = dicts.formRaw.TaxpayerName;
        vendorHoObj.VendorAddrObj.MrAddrTypeCode = CommonConstant.AddrTypeTax;
        vendorHoObj.VendorAddrObj.Addr = dicts.formRaw.Addr;
        vendorHoObj.VendorAddrObj.Zipcode = dicts.formRaw.Zipcode;
        vendorHoObj.VendorAddrObj.AreaCode2 = dicts.formRaw.AreaCode2;
        vendorHoObj.VendorAddrObj.AreaCode1 = dicts.formRaw.AreaCode1;
        vendorHoObj.VendorAddrObj.AreaCode3 = dicts.formRaw.AreaCode3;
        vendorHoObj.VendorAddrObj.AreaCode4 = dicts.formRaw.AreaCode4;
        vendorHoObj.VendorAddrObj.City = dicts.formRaw.City;
        vendorHoObj.VendorAddrObj.Province = dicts.formRaw.Province;
    }
  
    if (dicts.formRaw.VendorAttrList != undefined)
    {
        if (dicts.formRaw.VendorAttrList.length > 0) {
            let vendorAttrRequest = new Array<VendorAttrContentObj>();

            dicts.formRaw.VendorAttrList.forEach(x => {
                let vendorAttr = new VendorAttrContentObj();
                vendorAttr.VendorAttrContentId = x.VendorAttrContentId;
                vendorAttr.VendorId = dicts.VendorId;
                vendorAttr.AttrContent = x.VendorAttrValue;
                vendorAttr.AttrCode = x.AttrCode;
                vendorAttrRequest.push(vendorAttr);
            });

            vendorHoObj.VendorAttrContentObjs = vendorAttrRequest;
        }
    }
  
    if(dicts.vendorAtpmList != undefined && dicts.vendorAtpmList.length > 0)
    {
      vendorHoObj.VendorAtpmMappingObjs = new Array<VendorAtpmMappingObj>();

      for (let i = 0; i < dicts.vendorAtpmList.length; i++) {

        let vendorAtpmMappingObj = new VendorAtpmMappingObj();
        vendorAtpmMappingObj.VendorAtpmId = dicts.vendorAtpmList[i].VendorAtpmId;

        this.vendorHoObj.VendorAtpmMappingObjs.push(vendorAtpmMappingObj);
      }
    }
    
    if (dicts.mode != undefined && dicts.mode == "edit")
    {
        vendorHoObj.VendorObj.VendorId = dicts.VendorId;
        vendorHoObj.VendorAddrObj.VendorAddrId = dicts.VendorAddrObj.VendorAddrId;
        vendorHoObj.VendorObj.RowVersion = dicts.RowVersionVendor;
        vendorHoObj.VendorAddrObj.RowVersion = dicts.RowVersionAddr;
    }

    http.post<GenericObj>(url, vendorHoObj, AdInsConstant.SpinnerOptions).subscribe(
    (response) => {
        toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(router, [next], { "VendorId": response.Id, "mode": "edit", "MrVendorCategoryCode": dicts.formRaw.MrVendorCategoryCode });
    });
}