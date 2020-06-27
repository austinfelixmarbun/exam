import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ApprovalReqObj } from 'app/shared/model/Approval/ApprovalReqObj.Model';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-product-offering-deact-apv-detail',
  templateUrl: './product-offering-deact-apv-detail.component.html',
  providers: [NGXToastrService]
})
export class ProductOfferingDeactivateApprovalDetailComponent implements OnInit {

  prodOfferingHId: any;
  viewProdOfferMainInfoObj: any;
  taskId: number;
  instanceId: number;
  inputObj: any;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService, private http:HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["ProdOfferingHId"] != null) {
        this.prodOfferingHId = params["ProdOfferingHId"];
        this.taskId = params["TaskId"];
        this.instanceId = params["InstanceId"];

        
      }
    });
   }

  ngOnInit() {
    this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformationForDeactApv.json";
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
        this.router.navigate(["/Product/OfferingDeactivateApproval"]);
      }
    )
  }

  onAvailableNextTask()
  {
    
  }

  onApprovalSubmited()
  {
    this.toastr.successMessage("Success");
    this.router.navigate(["/Product/OfferingDeactivateApproval"]);
  }
  onCancelClick() {
    this.router.navigate(["/Product/OfferingDeactivateApproval"]);
  }
}
