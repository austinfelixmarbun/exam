import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";

export function saveOfficeGroupMember(CenterGrpId: Number, RefOfficeId: Number, listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
  let listRefOfficeIds = new Array<Number>();
  for (const temp of listTemp) {
    listRefOfficeIds.push(temp.RefOfficeId);
  }

  console.log(listRefOfficeIds);
  const reqObj = {
    CenterGrpId: CenterGrpId,
    RefOfficeId: listRefOfficeIds
  }

  const url = environment.FoundationR3Url + api;
  http.post(url, reqObj, AdInsConstant.SpinnerOptions).subscribe(
    response => {
      toastr.successMessage(response['message']);
      AdInsHelper.RedirectUrl(router,[NavigationConstant.CUSTOM_OFFICE_GROUP_MEMBER],{ "RefOfficeId": RefOfficeId, "CenterGrpId": CenterGrpId });
    }
  );
}