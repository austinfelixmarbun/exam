import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { ClaimTaskService } from 'app/shared/claimTask.service';
import { WorkflowApiObj } from 'app/shared/model/workflow-api-obj.model';
import { UploadReviewCustomObj } from 'app/shared/model/upload-review-custom-obj.model';

@Component({
  selector: 'app-review-upload-negative-customer-detail',
  templateUrl: './review-upload-negative-customer-detail.component.html'
})
export class ReviewUploadNegativeCustomerDetailComponent implements OnInit {
  uploadNo: string;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit = new Array();
  taskListId: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  currentUserContext: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
  
  readonly CancelLink: string = NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private cookieService: CookieService, private claimTaskService: ClaimTaskService) {
    this.route.queryParams.subscribe(params => {
      if (params["UploadNo"] != null) {
        this.uploadNo = params["UploadNo"];
      }
      if (params["TaskListId"] != null) {
        this.taskListId = params["TaskListId"];
      }
    });
  }
  
  ngOnInit() {    
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewReviewUploadNegativeCust.json";

    this.claimTask();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeCustomerDetail.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadNegativeCustomerDetail.json";
    this.inputPagingObj.addCritInput = new Array();
    const addCritAssetMasterId = new CriteriaObj();
    addCritAssetMasterId.DataType = 'text';
    addCritAssetMasterId.propName = 'UPLOAD_MONITORING_NO';
    addCritAssetMasterId.restriction = AdInsConstant.RestrictionEq;
    addCritAssetMasterId.value = this.uploadNo;
    this.arrCrit.push(addCritAssetMasterId);
    this.inputPagingObj.addCritInput.push(addCritAssetMasterId);
  }
  
  cancel() {
    let CancelUrl = environment.isCore? URLConstant.CancelUploadV2 : URLConstant.CancelUpload;
    var wfObj = new WorkflowApiObj();
    wfObj.TransactionNo = this.uploadNo;
    wfObj.ListValue["Status"] = "RJC";
    wfObj.ListValue["WfCode"] = CommonConstant.WorkflowUploadNegativeCustomer;
    wfObj.ListValue["TaskId"] = this.taskListId;
    this.http.post(CancelUrl, wfObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
      }); 
      }
    );
  }

  uploadReview(status: string) {
      let urlPost = environment.isCore ? URLConstant.UploadReviewV2 : URLConstant.UploadReview;

      var uploadObj = new UploadReviewCustomObj();
      uploadObj.MrUploadStatusCode = status;
      uploadObj.TaskListId = this.taskListId;
      uploadObj.UploadMonitoringNo = this.uploadNo;
      this.http.post(urlPost, uploadObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
        }
      );
  }

  claimTask() {
    if(environment.isCore){
      this.claimTaskService.ClaimTaskV2(this.taskListId);
    }
    else{
      this.claimTaskService.ClaimTask(this.taskListId);
    }
  }
}
