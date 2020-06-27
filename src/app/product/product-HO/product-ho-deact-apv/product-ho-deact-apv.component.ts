import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';
import { String } from 'typescript-string-operations';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';

@Component({
  selector: 'app-product-ho-deact-apv',
  templateUrl: './product-ho-deact-apv.component.html',
  providers: [NGXToastrService]
})
export class ProductHODeactivateApprovalComponent implements OnInit {

  inputPagingObj: any;
  arrCrit: any;
  userContext: CurrentUserContext = JSON.parse(localStorage.getItem(AdInsConstant.USER_ACCESS));

  constructor(private toastr: NGXToastrService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.inputPagingObj = new UcpagingModule();
    this.inputPagingObj._url = "./assets/ucpaging/product/searchProductHODeactApv.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductHODeactApv.json";

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'text';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'CATEGORY_CODE';
    critObj.value = 'PRD_HO_DEACT_APV';
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }



  CallBackHandler(ev) {
    var ApvReqObj = new ApprovalObj();
    if (ev.Key == "HoldTask") {
      ApvReqObj.TaskId = ev.RowObj.TaskId
      this.httpClient.post(AdInsConstant.ApvHoldTaskUrl, ApvReqObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
        }
      )
    }
    else if (ev.Key == "TakeBack") {
      if (String.Format("{0:L}", ev.RowObj.CURRENT_USER_ID) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(AdInsConstant.NOT_ELIGIBLE_FOR_TAKE_BACK);
      } else {
        ApvReqObj.TaskId = ev.RowObj.TaskId
        this.httpClient.post(AdInsConstant.ApvTakeBackTaskUrl, ApvReqObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
          }
        )
      }
    }
    else {
      this.toastr.errorMessage(String.Format(AdInsConstant.ERROR_NO_CALLBACK_SETTING, ev.Key));
    }
  }
}
