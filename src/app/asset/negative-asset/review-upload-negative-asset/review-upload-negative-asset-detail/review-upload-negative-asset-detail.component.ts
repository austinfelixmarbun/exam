import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UploadReviewCustomObj } from 'app/shared/model/UploadReviewCustomObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { WorkflowApiObj } from 'app/shared/model/WorkflowApiObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-review-upload-negative-asset-detail',
  templateUrl: './review-upload-negative-asset-detail.component.html',
  providers: [NGXToastrService]
})
export class ReviewUploadNegativeAssetDetailComponent implements OnInit {
  uploadNo: string;
  viewUpload: string;
  inputPagingObj: any;
  arrCrit = new Array();
  taskListId: any;
  UploadReviewUrl: string;
  CancelUpload: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
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
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
    
    this.claimTask();
    this.UploadReviewUrl = URLConstant.UploadReview;
    this.CancelUpload = URLConstant.CancelUpload;
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeAssetDetail.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadNegativeAssetDetail.json";
    this.inputPagingObj.addCritInput = new Array();
    const addCritAssetMasterId = new CriteriaObj();
    addCritAssetMasterId.DataType = 'text';
    addCritAssetMasterId.propName = 'UPLOAD_MONITORING_NO';
    addCritAssetMasterId.restriction = AdInsConstant.RestrictionEq;
    addCritAssetMasterId.value = this.uploadNo;
    this.arrCrit.push(addCritAssetMasterId);
    this.inputPagingObj.addCritInput.push(addCritAssetMasterId);
  }

  uploadReview(status) {
    var uploadObj = new UploadReviewCustomObj();
    uploadObj.MrUploadStatusCode = status;
    uploadObj.TaskListId = this.taskListId;
    uploadObj.UploadMonitoringNo = this.uploadNo;
    this.http.post(this.UploadReviewUrl, uploadObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(["/Asset/AssetMaster/ReviewUploadPaging"]);
      },
      error => {
        console.log(error);
      }
    );
  }
  claimTask() {
    var currentUserContext = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    var wfClaimObj = { pWFTaskListID: this.taskListId, pUserID: currentUserContext[CommonConstant.USER_NAME] };
    console.log(wfClaimObj);
    this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(
      (response) => {
      });
  }
}
