import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UploadReviewCustomObj } from 'app/shared/model/UploadReviewCustomObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { WorkflowApiObj } from 'app/shared/model/WorkflowApiObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-review-upload-negative-customer-detail',
  templateUrl: './review-upload-negative-customer-detail.component.html',
  providers: [NGXToastrService]
})
export class ReviewUploadNegativeCustomerDetailComponent implements OnInit {
  uploadNo: string;
  viewUpload: string;
  inputPagingObj: any;
  arrCrit = new Array();
  taskListId: any;
  UploadReviewUrl: string;
  CancelUpload: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["UploadNo"] != null) {
        this.uploadNo = params["UploadNo"];
      }
      if (params["TaskListId"] != null) {
        this.taskListId = params["TaskListId"];
      }
    });
    this.viewUpload = "./assets/ucviewgeneric/viewReviewUploadNegativeCust.json";
  }
  ngOnInit() {
    this.claimTask();
    this.UploadReviewUrl = URLConstant.UploadReview;
    this.CancelUpload = URLConstant.CancelUpload;
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeCustomerDetail.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
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

  uploadReview(status) {
    var uploadObj = new UploadReviewCustomObj();
    uploadObj.MrUploadStatusCode = status;
    uploadObj.TaskListId = this.taskListId;
    uploadObj.UploadMonitoringNo = this.uploadNo;
    this.http.post(this.UploadReviewUrl, uploadObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(["/Customer/NegativeCustomer/ReviewUploadPaging"]);
      },
      error => {
        console.log(error);
      }
    );
  }
  claimTask() {
    var currentUserContext = JSON.parse(localStorage.getItem("UserAccess"));
    var wfClaimObj = { pWFTaskListID: this.taskListId, pUserID: currentUserContext["UserName"] };
    console.log(wfClaimObj);
    this.http.post(URLConstant.ClaimTask, wfClaimObj).subscribe(
      (response) => {
      });
  }
}
