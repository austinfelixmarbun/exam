import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-ho-deact-apv-detail',
  templateUrl: './product-ho-deact-apv-detail.component.html',
  styleUrls: ['./product-ho-deact-apv-detail.component.scss']
})
export class ProductHODeactivateApprovalDetailComponent implements OnInit {

  prodHId: any;
  viewProdMainInfoObj: any;


  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
    if (params["ProdHId"] != null) {
        this.prodHId = params["ProdHId"];
      }
    });
  }

  ngOnInit() {
    this.viewProdMainInfoObj = "./assets/ucviewgeneric/viewProductMainInformation.json";
  }

}
