import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { WorkflowApiObj, WorkflowApiV2Obj } from 'app/shared/model/WorkflowApiObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { IntegrationObj } from 'app/shared/model/library/IntegrationObj.model';
import { RequestTaskModelObj } from 'app/shared/model/V2/RequestTaskModelObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-review-upload-asset-master-paging',
  templateUrl: './review-upload-asset-master-paging.component.html'
})
export class ReviewUploadAssetMasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  IntegrationObj: IntegrationObj = new IntegrationObj();
  requestTaskModel : RequestTaskModelObj = new RequestTaskModelObj();
  arrCrit = new Array<CriteriaObj>();

  constructor(private router: Router, private http: HttpClient, private toastr: NGXToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    let UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    
    if(environment.isCore){
      this.inputPagingObj._url = "./assets/ucpaging/V2/searchReviewUploadAssetMasterV2.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/V2/searchReviewUploadAssetMasterV2.json";

      this.inputPagingObj.isJoinExAPI = true;

      this.requestTaskModel.ProcessKey = CommonConstant.WorkflowUploadAssetMaster;
      this.requestTaskModel.OfficeCode = UserAccess[CommonConstant.OFFICE_CODE];
      this.requestTaskModel.TaskDefinitionKey = CommonConstant.WfUploadAssetMasterReview;
      this.requestTaskModel.RoleCode = UserAccess[CommonConstant.ROLE_CODE];
      this.requestTaskModel.OfficeRoleCodes = [UserAccess[CommonConstant.ROLE_CODE]];
      
      this.IntegrationObj.baseUrl = URLConstant.GetAllTaskWorkflow;
      this.IntegrationObj.requestObj = this.requestTaskModel;
      this.IntegrationObj.leftColumnToJoin = "UploadNo";
      this.IntegrationObj.rightColumnToJoin = "ProcessInstanceBusinessKey";
      this.IntegrationObj.joinType = CommonConstant.JOIN_TYPE_INNER;
      this.inputPagingObj.integrationObj = this.IntegrationObj;

    }
    else{
      this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadAssetMaster.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadAssetMaster.json";
    }
    
  }
  cancel(ev) {
    if(environment.isCore){
      var newWfObj = new WorkflowApiV2Obj();
      newWfObj.TaskListId = ev.RowObj.ExecutionId;
      newWfObj.TransactionNo = ev.RowObj.UploadNo;
      newWfObj.ListValue = { "Status": "RJC" };
      this.http.post(URLConstant.CancelUploadV2, newWfObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_MASTER_RVW_UPLOAD_PAGING],{});
          });
        });
    }
    else{
      var wfObj = new WorkflowApiObj();
      wfObj.TaskListId = ev.RowObj.TaskListId;
      wfObj.TransactionNo = ev.RowObj.UploadNo;
      wfObj.ListValue = { "Status": "RJC" };
      this.http.post(URLConstant.CancelUpload, wfObj).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_MASTER_RVW_UPLOAD_PAGING],{});
          });
        });
    }
  }
}