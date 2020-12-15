import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-vendor-grading-approval-detail',
  templateUrl: './vendor-grading-approval-detail.component.html',
  providers: [NGXToastrService]
})
export class VendorGradingApprovalDetailComponent implements OnInit {

  VendorGradingHistId: number;
  taskId: number;
  instanceId: number;
  inputObj: any;
  viewVendorBranchObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private router: Router, 
    private route: ActivatedRoute,
     private toastr: NGXToastrService,
     private http: HttpClient,
     ) {

    this.route.queryParams.subscribe(params => {

      if (params["VendorGradingHistId"] != null) {
        this.VendorGradingHistId = params["VendorGradingHistId"];
        this.taskId = params["TaskId"];
        this.instanceId = params["InstanceId"];
      }
    });
  }

  ngOnInit() {
    this.viewVendorBranchObj.viewInput = "./assets/ucviewgeneric/viewVendorGradingMainInformation.json";
    this.viewVendorBranchObj.viewEnvironment = environment.FoundationR3Url;

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

  HoldTask(obj : any){
    this.http.post(AdInsConstant.ApvHoldTaskUrl, obj).subscribe(
      (response)=>{
      }
    )
  }

  onAvailableNextTask(event : any)
  {
    
  }

  onApprovalSubmited(event : any)
  {
    this.toastr.successMessage("Success");
    this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
  }

  onCancelClick()
  {
    this.router.navigate(["/Vendor/VendorGrading/Approval/Paging"]);
  }

  GetCallBack(e : any){
    // AdInsHelper.OpenProdOfferingViewByCodeAndVersion(e.ViewObj.ProdOfferingCode, e.ViewObj.ProdOfferingVersion);
  }
}
