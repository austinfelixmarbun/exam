import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { environment } from "environments/environment";
import { GenericObj } from "../model/generic/generic-obj.model";
import { AdInsConstant } from "../AdInstConstant";
import { AdInsHelper } from "../AdInsHelper";

export function endStepperSrvyTaskDetail(SrvyTaskId: number, api: any, next: string, http: HttpClient, toastr: NGXToastrService, router: Router)
{
    let url = environment.FoundationR3Url + api;
    
    let ReqGenericObj: GenericObj = new GenericObj();
    ReqGenericObj.Id = SrvyTaskId;
    http.post(url, ReqGenericObj, AdInsConstant.SpinnerOptions).subscribe((response) => {
      AdInsHelper.RedirectUrl(router,[next],{ })
      toastr.successMessage(response['message']);
    });
}