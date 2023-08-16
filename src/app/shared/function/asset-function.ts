import { AssetSchmDObj } from '../model/asset-schm-d-obj.model';
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

export function addRangeAssetSchmD(AssetSchmHId: any, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
  var arrAssetSchmDObj = [];
  var assetSchmDObj = new AssetSchmDObj();
  for (const temp of listTemp) {
    assetSchmDObj = new AssetSchmDObj();
    assetSchmDObj.AssetSchmHId = AssetSchmHId;
    assetSchmDObj.AssetMasterId = temp.AssetMasterId;
    arrAssetSchmDObj.push(assetSchmDObj);
  }

  var AssetSchmObj = {
    AssetSchmDObjs: arrAssetSchmDObj
  }

  let url = environment.FoundationR3Url + api;
  http.post(url, AssetSchmObj, AdInsConstant.SpinnerOptions).subscribe(
    response => {
      toastr.successMessage(response['message']);
      AdInsHelper.RedirectUrl(router,[NavigationConstant.ASSET_SCHM_MBR_DETAIL],{ "AssetSchmHId": AssetSchmHId });
    }
  );
}