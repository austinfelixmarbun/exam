import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { UploadReviewCustomObj } from 'app/shared/model/UploadReviewCustomObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { ClaimTaskService } from 'app/shared/claimTask.service';
import { WorkflowApiObj } from 'app/shared/model/WorkflowApiObj.Model';

@Component({
  selector: 'app-review-upload-asset-master-detail',
  templateUrl: './review-upload-asset-master-detail.component.html'
})
export class ReviewUploadAssetMasterDetailComponent implements OnInit {
  uploadNo: string;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit = new Array();
  taskListId: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  currentUserContext: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

  readonly CancelLink: string = NavigationConstant.ASSET_MASTER_RVW_UPLOAD_PAGING;
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
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewReviewUploadAssetMaster.json";

    this.claimTask();

    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadAssetMasterDetail.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadAssetMasterDetail.json";
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
    wfObj.ListValue["WfCode"] = CommonConstant.WorkflowUploadAssetMaster;
    wfObj.ListValue["TaskId"] = this.taskListId;
    this.http.post(CancelUrl, wfObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_MASTER_RVW_UPLOAD_PAGING],{});
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
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_MASTER_RVW_UPLOAD_PAGING],{});
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
