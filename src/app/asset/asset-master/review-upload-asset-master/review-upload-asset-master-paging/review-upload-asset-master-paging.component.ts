import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { WorkflowApiObj } from 'app/shared/model/WorkflowApiObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review-upload-asset-master-paging',
  templateUrl: './review-upload-asset-master-paging.component.html',
  providers: [NGXToastrService]
})
export class ReviewUploadAssetMasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj;
  CancelUpload: string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService){}

  ngOnInit() {
    console.log('test');
    this.CancelUpload = AdInsConstant.CancelUpload;
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadAssetMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadAssetMaster.json";
  }
  cancel(ev) {
    var wfObj = new WorkflowApiObj();
    wfObj.TaskListId = ev.TaskListId;
    wfObj.TransactionNo = ev.UploadNo;
    wfObj.ListValue = { "Status": "CAN" };
    this.http.post(this.CancelUpload, wfObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/Asset/AssetMaster/ReviewUploadPaging']);
      }); 
      },
      error => {
        console.log(error);
      }
    );
  }
}