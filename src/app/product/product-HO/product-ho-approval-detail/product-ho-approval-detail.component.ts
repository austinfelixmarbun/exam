import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';

@Component({
  selector: 'app-product-ho-approval-detail',
  templateUrl: './product-ho-approval-detail.component.html',
  providers: [NGXToastrService]
})
export class ProductHOApprovalDetailComponent implements OnInit {

  prodHId: number;
  taskId: number;
  instanceId: number;
  inputObj: any;

  constructor(private router: Router, 
    private route: ActivatedRoute,
     private toastr: NGXToastrService,
     private http: HttpClient,
     ) {

    this.route.queryParams.subscribe(params => {

      if (params["ProdHId"] != null) {
        this.prodHId = params["ProdHId"];
        this.taskId = params["TaskId"];
        this.instanceId = params["InstanceId"];
      }
    });
  }

  ngOnInit() {

    var obj = {
      taskId: this.taskId,
      instanceId: this.instanceId,
      approvalBaseUrl: environment.ApprovalURL
    }

    this.inputObj = obj;

    var ApvHoldObj = new ApprovalObj()
    ApvHoldObj.TaskId = obj.taskId

    this.HoldTask(ApvHoldObj);
  }

  HoldTask(obj){
    this.http.post(AdInsConstant.ApvHoldTaskUrl, obj).subscribe(
      (response)=>{
        this.toastr.successMessage(response["Message"]);
      },
      (error)=>{
        this.router.navigate(["/Product/HOApproval"]);
      }
    )
  }

  onAvailableNextTask()
  {
    
  }

  onApprovalSubmited(event)
  {
    var data = {
      ProdHId : this.prodHId,
      TaskId : event.taskId,
      InstanceId : event.instanceId,
      Notes : event.notes,
      Reason : event.reason,
      ReasonType : event.reasonType,
      Result : event.result
    }
    this.http.post(AdInsConstant.UpdateProductPostApv, data).subscribe(
      () => {
        this.toastr.successMessage("Success");
        this.router.navigate(["/Product/HOApproval"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCancelClick()
  {
    this.router.navigate(["/Product/HOApproval"]);
  }
}
