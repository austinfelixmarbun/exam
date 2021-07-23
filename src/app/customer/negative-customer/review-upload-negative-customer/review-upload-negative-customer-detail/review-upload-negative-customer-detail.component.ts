import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UploadReviewCustomObj, UploadReviewCustomV2Obj } from 'app/shared/model/UploadReviewCustomObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';

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
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private cookieService: CookieService) {
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

  uploadReview(status: string) {
    if(environment.isCore){
      var uploadV2Obj = new UploadReviewCustomV2Obj();
      uploadV2Obj.TaskListId = this.taskListId;
      uploadV2Obj.MrUploadStatusCode = status;
      uploadV2Obj.UploadMonitoringNo = this.uploadNo;

      this.http.post(URLConstant.UploadReviewV2, uploadV2Obj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
        }
      );
    }
    else{
      var uploadObj = new UploadReviewCustomObj();
      uploadObj.MrUploadStatusCode = status;
      uploadObj.TaskListId = this.taskListId;
      uploadObj.UploadMonitoringNo = this.uploadNo;
      this.http.post(URLConstant.UploadReview, uploadObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
        }
      );
    }
  }

  claimTask() {
    if(environment.isCore){
      var newWfClaimObj = { TaskId: this.taskListId, UserId: this.currentUserContext[CommonConstant.USER_NAME] };
      this.http.post(URLConstant.ClaimTaskV2, newWfClaimObj).subscribe(
        (response) => {
      });
    }
    else{
      var wfClaimObj = { pWFTaskListID: this.taskListId, pUserID: this.currentUserContext[CommonConstant.USER_NAME] };
      this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(
        (response) => {
      });
    }
  }
}
