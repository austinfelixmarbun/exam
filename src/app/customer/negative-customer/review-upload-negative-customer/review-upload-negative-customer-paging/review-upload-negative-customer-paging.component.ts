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

@Component({
  selector: 'app-review-upload-negative-customer-paging',
  templateUrl: './review-upload-negative-customer-paging.component.html'
})
export class ReviewUploadNegativeCustomerPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  CancelUpload: string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService){}

  ngOnInit() {
    this.CancelUpload = URLConstant.CancelUpload;
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeCustomer.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadNegativeCustomer.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "UMH.OFFICE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }
  cancel(ev) {
    var wfObj = new WorkflowApiObj();
    wfObj.TaskListId = ev.RowObj.TaskListId;
    wfObj.TransactionNo = ev.RowObj.UploadNo;
    wfObj.ListValue = { "Status": "RJC" };
    this.http.post(this.CancelUpload, wfObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_NEG_RVW_UPLOAD_PAGING],{});
      }); 
      }
    );
  }
}