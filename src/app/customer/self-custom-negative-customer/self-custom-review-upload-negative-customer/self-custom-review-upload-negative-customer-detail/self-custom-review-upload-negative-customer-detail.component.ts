import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaimTaskService } from 'app/shared/claimTask.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { WorkflowApiObj } from 'app/shared/model/workflow-api-obj.model';

@Component({
  selector: 'app-self-custom-review-upload-negative-customer-detail',
  templateUrl: './self-custom-review-upload-negative-customer-detail.component.html'
})
export class SelfCustomReviewUploadNegativeCustomerDetailComponent implements OnInit {

  pageName: string
  taskListId: any;
  uploadNo: any;

  constructor(
    private claimTaskService: ClaimTaskService,
    private route: ActivatedRoute
  ){
    this.route.queryParams.subscribe(params => {
      if (params["TaskListId"] != null) {
        this.taskListId = params["TaskListId"];
      }

    });
    this.pageName = "NegativeCustomer"
    console.log("taskListId",this.taskListId);
  }


  ngOnInit(){
    this.claimTask();
  }

  claimTask() {
    this.claimTaskService.ClaimTaskV2(this.taskListId);
  }


}
