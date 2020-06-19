import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';

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
      }

      var obj = {
        taskId: params["TaskId"],
        instanceId: params["InstanceId"],
        approvalBaseUrl: environment.ApprovalURL
      }

      this.inputObj = obj;
    });
  }

  ngOnInit() {
  }

  onAvailableNextTask(event)
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
      (response) => {
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
