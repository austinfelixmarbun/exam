import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { UcPagingObj, WhereValueObj } from "app/shared/model/UcPagingObj.Model";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";

@Component({
  selector: "app-product-offering-deactivate-paging",
  templateUrl: "./product-offering-deactivate.component.html",
  providers: [DecimalPipe]
})
export class ProductOfferingDeactivatePagingComponent implements OnInit {
  inputPagingObj: any;
  arrCrit: any;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/product/searchProductOfferingDeactivate.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductOfferingDeactivate.json";

    var WVTrxTypeCodeObj = new WhereValueObj();
    WVTrxTypeCodeObj.property = "TrxTypeCode";
    WVTrxTypeCodeObj.value = "PROD";
    this.inputPagingObj.whereValue.push(WVTrxTypeCodeObj);

    var WVProdOfferingStatObj = new WhereValueObj();
    WVProdOfferingStatObj.property = "ProdOfferingStat";
    WVProdOfferingStatObj.value = "ACT";
    this.inputPagingObj.whereValue.push(WVProdOfferingStatObj);
  }
}
