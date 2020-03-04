import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';



@Component({
  selector: "app-product-ho-view",
  templateUrl: "./product-ho-view.component.html",
  providers: [DecimalPipe, NGXToastrService]
})
export class ProductHOViewComponent implements OnInit {
  prodId: any;
  prodHId: any;
  viewProdMainInfoObj: any;
  prodHPagingObj: any;
  prodHCrit: any;
  prodBranchMemPagingObj: any;
  prodBrancMemCrit: any;
  apiUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    this.apiUrl = AdInsConstant.GetRefZipCodeById;

    this.route.queryParams.subscribe(params => {
      if (params["prodHId"] != null) {
        this.prodHId = params["prodHId"];
      }
      if (params["prodId"] != null) {
        this.prodId = params["prodId"];
      }
    });
  }

  ngOnInit() {
    this.viewProdMainInfoObj = "./assets/ucviewgeneric/viewProductMainInformation.json";

    this.prodHPagingObj = new UcPagingObj();
    this.prodHPagingObj._url = "./assets/ucpaging/product/searchProdHforProductHOView.json";
    this.prodHPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.prodHPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.prodHPagingObj.pagingJson = "./assets/ucpaging/product/searchProdHforProductHOView.json";
    this.prodHCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'A.PROD_ID';
    critObj.value = this.prodId;
    this.prodHCrit.push(critObj);
    this.prodHPagingObj.addCritInput = this.prodHCrit;

    this.prodBranchMemPagingObj = new UcPagingObj();
    this.prodBranchMemPagingObj._url = "./assets/ucpaging/product/searchProdBranchMemforProductHOView.json";
    this.prodBranchMemPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.prodBranchMemPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.prodBranchMemPagingObj.pagingJson = "./assets/ucpaging/product/searchProdBranchMemforProductHOView.json";
    this.prodBrancMemCrit = new Array();
    var critObj2 = new CriteriaObj();
    critObj2.restriction = AdInsConstant.RestrictionEq;
    critObj2.propName = 'B.PROD_H_ID';
    critObj2.value = this.prodHId;
    this.prodBrancMemCrit.push(critObj2);
    this.prodBranchMemPagingObj.addCritInput = this.prodBrancMemCrit;



  }


}
