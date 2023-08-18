import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import {environment} from '../../../environments/environment';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

export function addEditCustAsset(parentForm: any, CustId: number, CustAssetId: number, api: any, RowVersion: any, http: HttpClient, toastr: NGXToastrService)
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
    })
}

export function addEditCustAddr(parentForm: any, CustId: number, CustAddrId: number, api: any, RowVersion: any, http: HttpClient, toastr: NGXToastrService)
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
    })
}