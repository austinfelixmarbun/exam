import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UploadReviewCustomObj } from 'app/shared/model/UploadReviewCustomObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-review-upload-asset-master-detail',
  templateUrl: './review-upload-asset-master-detail.component.html'
})
export class ReviewUploadAssetMasterDetailComponent implements OnInit {
  uploadNo: string;
  viewUpload: string = "./assets/ucviewgeneric/viewReviewUploadAssetMaster.json";
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit = new Array();
  taskListId: any;

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
    this.claimTask();

    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadAssetMasterDetail.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
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

  uploadReview(status: string) {
    var uploadObj = new UploadReviewCustomObj();
    uploadObj.MrUploadStatusCode = status;
    uploadObj.TaskListId = this.taskListId;
    uploadObj.UploadMonitoringNo = this.uploadNo;
    this.http.post(AdInsConstant.UploadReview, uploadObj).subscribe(
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
    var currentUserContext = JSON.parse(localStorage.getItem("UserAccess"));
    var wfClaimObj = { pWFTaskListID: this.taskListId, pUserID: currentUserContext["UserName"] };
    this.http.post(AdInsConstant.ClaimTask, wfClaimObj).subscribe(
      (response) => {
      });
  }
}
