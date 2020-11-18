import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ApprovalObj } from 'app/shared/model/Approval/ApprovalObj.Model';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-product-offering-deact-apv-detail',
  templateUrl: './product-offering-deact-apv-detail.component.html',
  providers: [NGXToastrService]
})
export class ProductOfferingDeactivateApprovalDetailComponent implements OnInit {

  prodOfferingHId: any;
  taskId: number;
  instanceId: number;
  inputObj: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["ProdOfferingHId"] != null) {
        this.prodOfferingHId = params["ProdOfferingHId"];
        this.taskId = params["TaskId"];
        this.instanceId = params["InstanceId"];


      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewProductOfferingMainInformationForDeactApv.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

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

  HoldTask(obj) {
    this.http.post(AdInsConstant.ApvHoldTaskUrl, obj).subscribe(
      (response) => {
      }
    )
  }

  onAvailableNextTask() {

  }

  onApprovalSubmited() {
    this.toastr.successMessage("Success");
    AdInsHelper.RedirectUrl(this.router,["/Product/OfferingDeactivateApproval"],{ });
  }
  onCancelClick() {
    AdInsHelper.RedirectUrl(this.router,["/Product/OfferingDeactivateApproval"],{ });
  }
}
