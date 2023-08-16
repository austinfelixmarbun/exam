import { HttpClient } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import {environment} from '../../../environments/environment';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

export function addEditCustAsset(parentForm: FormGroup, Id: number, api: any, http: HttpClient, toastr: NGXToastrService, activeModal: NgbActiveModal)
{
    let url = environment.FoundationR3Url + api;
    console.log(parentForm.getRawValue())
    let form = parentForm.getRawValue();
    let AssetTotalValue = form.AssetValue * form.AssetQty;
    console.log("AssetTotalValue " + "ABC")

    let obj = {
        "AssetDescr" : parentForm.get('AssetDescr').value,
        "AssetQty" : parentForm.get('AssetQty').value,
        "AssetTotalValue" : AssetTotalValue,
        "AssetValue": parentForm.get('AssetValue').value,
        "CustId": Id,
        "MrCustAssetTypeCode": parentForm.get('MrCustAssetTypeCode').value
    }

    http.post(url, obj).subscribe(
    (response: any) => {
            toastr.successMessage("Success!");
            activeModal.close();
    })

}