import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { WorkflowApiObj } from 'app/shared/model/workflow-api-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { environment } from 'environments/environment';
import { IntegrationObj } from 'app/shared/model/library/integration-obj.model';
import { RequestTaskModelObj } from 'app/shared/model/v2/request-task-model-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-review-upload-negative-asset-paging',
  templateUrl: './review-upload-negative-asset-paging.component.html'
})
export class ReviewUploadNegativeAssetPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  IntegrationObj: IntegrationObj = new IntegrationObj();
  requestTaskModel : RequestTaskModelObj = new RequestTaskModelObj();
  

  constructor(private router: Router, private http: HttpClient, private toastr: NGXToastrService,  private cookieService: CookieService, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    let UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    if(environment.isCore){
      this.inputPagingObj._url = "./assets/ucpaging/V2/searchReviewUploadNegativeAssetV2.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/V2/searchReviewUploadNegativeAssetV2.json";

      this.inputPagingObj.isJoinExAPI = true;

      this.requestTaskModel.ProcessKey = CommonConstant.WorkflowUploadNegativeAsset;
      this.requestTaskModel.TaskDefinitionKey = CommonConstant.WfUploadNegativeAssetReview;
      this.requestTaskModel.OfficeRoleCodes = [UserAccess[CommonConstant.ROLE_CODE],
                                               UserAccess[CommonConstant.OFFICE_CODE],
                                               UserAccess[CommonConstant.ROLE_CODE] + "-" + UserAccess[CommonConstant.OFFICE_CODE]];
      
      this.IntegrationObj.baseUrl = this.UrlConstantNew.GetAllTaskWorkflow;
      this.IntegrationObj.requestObj = this.requestTaskModel;
      this.IntegrationObj.leftColumnToJoin = "UploadNo";
      this.IntegrationObj.rightColumnToJoin = "ProcessInstanceBusinessKey";
      this.IntegrationObj.joinType = CommonConstant.JOIN_TYPE_INNER;
      this.inputPagingObj.integrationObj = this.IntegrationObj;

    }
    else{
      this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeAsset.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadNegativeAsset.json";
    }
    
  }
  cancel(ev) {
    let CancelUrl = environment.isCore? this.UrlConstantNew.CancelUploadV2 : this.UrlConstantNew.CancelUpload;
    var wfObj = new WorkflowApiObj();
    wfObj.TaskListId =  environment.isCore? ev.RowObj.ProcessInstanceId : ev.RowObj.TaskListId;
    wfObj.TransactionNo = ev.RowObj.UploadNo;
    wfObj.ListValue = { "Status": "RJC" };
    this.http.post(CancelUrl, wfObj, AdInsConstant.SpinnerOptions).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ASSET_NEG_RVW_UPLOAD_PAGING],{});
        });
      }
    );    
  }
}