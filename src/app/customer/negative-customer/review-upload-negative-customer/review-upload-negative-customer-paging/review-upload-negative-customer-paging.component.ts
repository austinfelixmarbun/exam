import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { WorkflowApiObj } from 'app/shared/model/WorkflowApiObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-review-upload-negative-customer-paging',
  templateUrl: './review-upload-negative-customer-paging.component.html',
  providers: [NGXToastrService]
})
export class ReviewUploadNegativeCustomerPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj;
  CancelUpload: string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService){}

  ngOnInit() {
    this.CancelUpload = URLConstant.CancelUpload;
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadNegativeCustomer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
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
          this.router.navigate(['/Customer/NegativeCustomer/ReviewUploadPaging']);
      }); 
      },
      error => {
        console.log(error);
      }
    );
  }
}