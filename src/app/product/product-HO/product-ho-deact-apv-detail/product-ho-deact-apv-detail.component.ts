import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

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


  constructor(private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService ) { 
    this.route.queryParams.subscribe(params => {
    if (params["ProdHId"] != null) {
        this.prodHId = params["ProdHId"];

        this.taskId = params["TaskId"];
        this.instanceId = params["InstanceId"];
      }
    });
  }

  ngOnInit() {
    this.viewProdMainInfoObj = "./assets/ucviewgeneric/viewProductMainInformation.json";
    var obj = {
      taskId: this.taskId,
      instanceId: this.instanceId,
      approvalBaseUrl: "http://r3app-server/APPROVAL"
    }

    this.inputObj = obj;
  }

  onAvailableNextTask(event)
  {
    
  }

  onApprovalSubmited(event)
  {
    this.toastr.successMessage("Success");
    this.router.navigate(["/Product/HODeactivate"]);
  }

}
