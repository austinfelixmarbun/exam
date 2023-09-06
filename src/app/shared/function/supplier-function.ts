import { AdInsHelper } from "../AdInsHelper";
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { Router } from "@angular/router";

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

export function test(listTemp: any, VendorId: number, api: any, next: string, from: string)
{
    alert('Say Hi from other function!');
}