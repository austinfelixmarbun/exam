import { NGXToastrService } from "app/components/extra/toastr/toastr.service";
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from '../../../environments/environment';
import { Router } from "@angular/router";
import { ExceptionConstant } from '../constant/ExceptionConstant';

export function rerunJournal(listTemp: any[], api: any, http: HttpClient, toastr: NGXToastrService, router: Router) {
  var req = [];
    if(listTemp.length == 0) {
      toastr.warningMessage(ExceptionConstant.SELECT_ONE_JOURNAL);
      return
    }
    for (let i = 0; i < listTemp.length; i++) {
      if (!req.some(x => x == listTemp[i].JrNo)) {
        req.push(listTemp[i].JrNo)
      }
    }

    let url = environment.FoundationR3Url + api;
    http.post(url, {
      ListTransactionNo: req
    }, AdInsConstant.SpinnerOptions).subscribe(
      res => {
        toastr.warningMessage('Rerun journal success, Process may take several time');
        router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(router,[NavigationConstant.SELF_CUSTOM_FAILED_JOURNAL_RESULT_LIST_PAGING],{});
        });
      },
      err => {
        toastr.errorMessage(ExceptionConstant.RERUN_JOURNAL_FAILED)
      }
    )
}