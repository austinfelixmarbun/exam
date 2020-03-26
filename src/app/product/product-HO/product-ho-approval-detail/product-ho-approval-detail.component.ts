import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-ho-approval-detail',
  templateUrl: './product-ho-approval-detail.component.html',
})
export class ProductHOApprovalDetailComponent implements OnInit {

  prodHId: any;
  taskId: any;
  instanceId: any;
  inputObj: any;

  constructor(private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {

      if (params["ProdHId"] != null) {
        this.prodHId = params["ProdHId"];
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
}
