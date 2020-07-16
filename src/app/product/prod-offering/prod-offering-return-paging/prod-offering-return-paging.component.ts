import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-prod-offering-return-paging',
  templateUrl: './prod-offering-return-paging.component.html'
})
export class ProdOfferingReturnPagingComponent implements OnInit {

  inputPagingObj: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/product/searchProductOfferingReturn.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductOfferingReturn.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "A.Prod_Offering_Stat",
        environment: environment.FoundationR3Url
      }
    ];

    var WVTrxTypeCodeObj = new WhereValueObj();
    WVTrxTypeCodeObj.property = "TrxTypeCode";
    WVTrxTypeCodeObj.value = "PROD";
    this.inputPagingObj.whereValue.push(WVTrxTypeCodeObj);

    var WVProdOfferingStatObj = new WhereValueObj();
    WVProdOfferingStatObj.property = "ProdOfferingStat";
    WVProdOfferingStatObj.value = "RET";
    this.inputPagingObj.whereValue.push(WVProdOfferingStatObj);
  }

  EditProdOfr(e)
  {
    if(e.RowObj.DraftProdOfferingHId == null)
    {
      this.router.navigate(["/Product/ProdOffering/add"], { queryParams: { "ProdOfferingHId": e.RowObj.CurrentProdOfferingHId, "mode" : "edit", "source" : "return" } });
    }
    else
    {
      this.router.navigate(["/Product/ProdOffering/add"], { queryParams: { "ProdOfferingHId": e.RowObj.DraftProdOfferingHId, "mode" : "edit", "source" : "return" } });
    }
  }
}
