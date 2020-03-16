import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-ho-approval-detail',
  templateUrl: './product-ho-approval-detail.component.html',
  styleUrls: ['./product-ho-approval-detail.component.scss']
})
export class ProductHOApprovalDetailComponent implements OnInit {

  prodHId: any;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
    if (params["ProdHId"] != null) {
        this.prodHId = params["ProdHId"];
      }
    });
  }

  ngOnInit() {
  }

}
