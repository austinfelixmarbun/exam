import { UcpagingModule } from '@adins/ucpaging';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';
import { ApprovalReqObj, ApvClaimTaskObj } from 'app/shared/model/Approval/ApprovalReqObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { IntegrationObj } from 'app/shared/model/library/IntegrationObj.model';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-vendor-grading-approval-paging',
  templateUrl: './vendor-grading-approval-paging.component.html',
  providers: [NGXToastrService]
})
export class VendorGradingApprovalPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  apvReqObj: ApprovalReqObj = new ApprovalReqObj();
  integrationObj: IntegrationObj = new IntegrationObj();
  arrCrit: any;
  userContext: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));;

  constructor(private toastr: NGXToastrService, private httpClient: HttpClient, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/dealer-grading/searchDealerGradingApproval.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/dealer-grading/searchDealerGradingApproval.json";

    if(environment.isCore){
      this.inputPagingObj._url = "./assets/ucpaging/dealer-grading/V2/searchDealerGradingApprovalV2.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/dealer-grading/V2/searchDealerGradingApprovalV2.json";
      this.inputPagingObj.isJoinExAPI = true;

      this.apvReqObj.CategoryCode = CommonConstant.VENDOR_GRADING_APV;
      this.apvReqObj.Username = this.userContext.UserName;
      this.apvReqObj.RoleCode = this.userContext.RoleCode;
      this.integrationObj.baseUrl = URLConstant.GetListOSApvTaskByCategoryCodeAndCurrentUserIdOrMainUserIdAndRoleCode;
      this.integrationObj.requestObj = this.apvReqObj;
      this.integrationObj.leftColumnToJoin = "VendorGradingHistNo";
      this.integrationObj.rightColumnToJoin = "TransactionNo";
      this.integrationObj.joinType = CommonConstant.JOIN_TYPE_INNER;
      this.inputPagingObj.integrationObj = this.integrationObj; 
    }
    
  }

  CallBackHandler(ev) {
    var ApvReqObj = new ApprovalObj();
    var isRoleAssignment = ev.RowObj.IsRoleAssignment.toString();

    if (ev.Key == "Process") {
      if(isRoleAssignment != CommonConstant.TRUE){
        if (String.Format("{0:L}", ev.RowObj.CurrentUser) != String.Format("{0:L}", this.userContext.UserName)) {
          this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_PROCESS_TASK);
        } else {
          this.router.navigate([NavigationConstant.VENDOR_GRD_REQ_APV_DETAIL], { queryParams: { "VendorGradingHistId": ev.RowObj.VendorGradingHistId, "VendorGradingHistNo": ev.RowObj.VendorGradingHistNo ,"TaskId": ev.RowObj.TaskId, "InstanceId": ev.RowObj.InstanceId, "ApvReqId": ev.RowObj.ApvReqId} });
        }
      }
      else{
        if (ev.RowObj.CurrentUser == "-") {
          var claimTaskObj = new ApvClaimTaskObj();
          claimTaskObj.TaskId = ev.RowObj.TaskId;
          claimTaskObj.Username = this.userContext.UserName;
          this.httpClient.post(URLConstant.ApvClaimTask, claimTaskObj).subscribe(
            (response) => {
              this.toastr.successMessage(response["Message"]);
              this.router.navigate([NavigationConstant.VENDOR_GRD_REQ_APV_DETAIL], { queryParams: { "VendorGradingHistId": ev.RowObj.VendorGradingHistId, "VendorGradingHistNo": ev.RowObj.VendorGradingHistNo ,"TaskId": ev.RowObj.TaskId, "InstanceId": ev.RowObj.InstanceId, "ApvReqId": ev.RowObj.ApvReqId} });
            },
            error => {
              console.log(error);
            }
          )
        } else {
          this.router.navigate([NavigationConstant.VENDOR_GRD_REQ_APV_DETAIL], { queryParams: { "VendorGradingHistId": ev.RowObj.VendorGradingHistId, "VendorGradingHistNo": ev.RowObj.VendorGradingHistNo ,"TaskId": ev.RowObj.TaskId, "InstanceId": ev.RowObj.InstanceId, "ApvReqId": ev.RowObj.ApvReqId} });
        }
      }
    }
    else if (ev.Key == "HoldTask") {
      if (String.Format("{0:L}", ev.RowObj.CurrentUser) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_HOLD);
      } else {
        ApvReqObj.TaskId = ev.RowObj.TaskId
        this.httpClient.post(AdInsConstant.ApvHoldTaskUrl, ApvReqObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
          }
        )
      }
    }
    else if (ev.Key == "TakeBack") {
      if (String.Format("{0:L}", ev.RowObj.MainUser) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_TAKE_BACK);
      } else {
        ApvReqObj.TaskId = ev.RowObj.TaskId;
        ApvReqObj.Username = ev.RowObj.MainUser;
        this.httpClient.post(AdInsConstant.ApvTakeBackTaskUrl, ApvReqObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
          }
        )
      }
    }
    else if (ev.Key == "UnClaim") {
      if (String.Format("{0:L}", ev.RowObj.CurrentUser) != String.Format("{0:L}", this.userContext.UserName)) {
        this.toastr.warningMessage(ExceptionConstant.NOT_ELIGIBLE_FOR_TAKE_BACK);
      } else {
        ApvReqObj.TaskId = ev.RowObj.TaskId;
        this.httpClient.post(AdInsConstant.ApvUnclaimTaskUrl, ApvReqObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
          }
        )
      }
    }
    else {
      this.toastr.warningMessage(String.Format(ExceptionConstant.ERROR_NO_CALLBACK_SETTING, ev.Key));
    }
  }
}
