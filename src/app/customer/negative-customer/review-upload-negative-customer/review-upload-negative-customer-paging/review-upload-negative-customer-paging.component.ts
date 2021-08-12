import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { WorkflowApiObj } from 'app/shared/model/WorkflowApiObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CookieService } from 'ngx-cookie';
import { IntegrationObj } from 'app/shared/model/library/IntegrationObj.model';
import { RequestTaskModelObj } from 'app/shared/model/V2/RequestTaskModelObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-review-upload-negative-customer-paging',
  templateUrl: './review-upload-negative-customer-paging.component.html'
})
export class ReviewUploadNegativeCustomerPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  IntegrationObj: IntegrationObj = new IntegrationObj();
  requestTaskModel : RequestTaskModelObj = new RequestTaskModelObj();
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private cookieService: CookieService){}

  ngOnInit() {
    let UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));

    if(environment.isCore){
      this.inputPagingObj._url = "./assets/ucpaging/V2/searchReviewUploadNegativeCustomerV2.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/V2/searchReviewUploadNegativeCustomerV2.json";

      this.inputPagingObj.isJoinExAPI = true;

      this.requestTaskModel.ProcessKey = CommonConstant.WorkflowUploadNegativeCustomer,
      this.requestTaskModel.OfficeCode = UserAccess[CommonConstant.OFFICE_CODE],
      this.requestTaskModel.TaskDefinitionKey = CommonConstant.WfUploadNegativeCustomerReview,
      this.requestTaskModel.RoleCode = UserAccess[CommonConstant.ROLE_CODE],
      
      this.IntegrationObj.baseUrl = URLConstant.GetAllTaskWorkflow;
      this.IntegrationObj.requestObj = this.requestTaskModel;
      this.IntegrationObj.leftColumnToJoin = "UploadNo";
      this.IntegrationObj.rightColumnToJoin = "ProcessInstanceBusinessKey";
      this.IntegrationObj.joinType = CommonConstant.JOIN_TYPE_INNER;
      this.inputPagingObj.integrationObj = this.IntegrationObj;
    }
    else{
      this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeCustomer.json";
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadNegativeCustomer.json";
    }
  }
  
  cancel(ev) {
    let CancelUrl = environment.isCore? URLConstant.CancelUploadV2 : URLConstant.CancelUpload;
    var wfObj = new WorkflowApiObj();
    wfObj.TaskListId = environment.isCore? ev.RowObj.ExecutionId : ev.RowObj.TaskListId;
    wfObj.TransactionNo = ev.RowObj.UploadNo;
    wfObj.ListValue = { "Status": "RJC" };
    this.http.post(CancelUrl, wfObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
      }); 
      }
    );
  }
}