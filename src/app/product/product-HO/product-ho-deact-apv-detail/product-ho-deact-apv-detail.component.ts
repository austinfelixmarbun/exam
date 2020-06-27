import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { ApprovalReqObj } from 'app/shared/model/Approval/ApprovalReqObj.Model';

@Component({
  selector: 'app-product-ho-deact-apv-detail',
  templateUrl: './product-ho-deact-apv-detail.component.html',
  providers: [NGXToastrService]
})
export class ProductHODeactivateApprovalDetailComponent implements OnInit {

  prodHId: number;
  taskId: number;
  instanceId: number;
  inputObj: any;
  viewProdMainInfoObj: any;


  constructor(private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService, private http:HttpClient) { 
    this.route.queryParams.subscribe(params => {
    if (params["ProdHId"] != null) {
        this.prodHId = params["ProdHId"];
        this.taskId = params["TaskId"];
        this.instanceId = params["InstanceId"];
      }
    });
  }

  ngOnInit() {
    this.viewProdMainInfoObj = "./assets/ucviewgeneric/viewProductMainInformationForDeactApv.json";
    var obj = {
      taskId: this.taskId,
      instanceId: this.instanceId,
      approvalBaseUrl: environment.ApprovalURL
    }

    this.inputObj = obj;
    
    var ApvHoldObj = new ApprovalReqObj()
    ApvHoldObj.TaskId = obj.taskId

    this.HoldTask(ApvHoldObj);
  }


  HoldTask(obj){
    this.http.post(AdInsConstant.ApvHoldTaskUrl, obj).subscribe(
      (response)=>{
        this.toastr.successMessage(response["Message"]);
      },
      (error)=>{
        this.router.navigate(["/Product/HODeactivateApproval"]);
      }
    )
  }

  onAvailableNextTask()
  {
    
  }

  onApprovalSubmited()
  {
    this.toastr.successMessage("Success");
    this.router.navigate(["/Product/HODeactivateApproval"]);
  }
  onCancelClick() {
    this.router.navigate(["/Product/HODeactivateApproval"]);
  }
}
