import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-product-offering-approval-detail',
  templateUrl: './product-offering-approval-detail.component.html',
  providers: [NGXToastrService]
})
export class ProductOfferingApprovalDetailComponent implements OnInit {

  prodOfferingHId: number;
  taskId: number;
  instanceId: number;
  inputObj: any;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["ProdOfferingHId"] != null) {
        this.prodOfferingHId = params["ProdOfferingHId"];
      }

      var obj = {
        taskId: params["TaskId"],
        instanceId: params["InstanceId"],
        approvalBaseUrl: "http://r3app-server/APPROVAL"
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
    this.toastr.successMessage("Success");
    this.router.navigate(["/Product/OfferingApproval"]);
  }

}
