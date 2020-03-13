import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-offering-deact-apv-detail',
  templateUrl: './product-offering-deact-apv-detail.component.html',
  styleUrls: ['./product-offering-deact-apv-detail.component.scss']
})
export class ProductOfferingDeactivateApprovalDetailComponent implements OnInit {

  prodOfferingHId: any;
  viewProdOfferMainInfoObj: any;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["ProdOfferingHId"] != null) {
        this.prodOfferingHId = params["ProdOfferingHId"];
      }
    });
   }

  ngOnInit() {
    this.viewProdOfferMainInfoObj = "./assets/ucviewgeneric/viewProductOfferingMainInformation.json";
  }

}
