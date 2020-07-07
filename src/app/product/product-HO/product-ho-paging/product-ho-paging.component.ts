import { Component, OnInit } from '@angular/core';
import { UcpagingModule } from '@adins/ucpaging';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { WhereValueObj, UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-product-ho-paging',
  templateUrl: './product-ho-paging.component.html',
})
export class ProductHOPagingComponent implements OnInit {

  inputPagingObj: any;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.inputPagingObj=new UcPagingObj();
    this.inputPagingObj._url="./assets/ucpaging/product/searchProductHO.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    // this.inputPagingObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductHO.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "A.Prod_Stat",
        environment: environment.FoundationR3Url
      }
    ];

    var WVTrxTypeCodeObj = new WhereValueObj();
    WVTrxTypeCodeObj.property = "TrxTypeCode";
    WVTrxTypeCodeObj.value = "PROD";
    this.inputPagingObj.whereValue.push(WVTrxTypeCodeObj);

    var WVProdStatObj = new WhereValueObj();
    WVProdStatObj.property = "ProdStat";
    WVProdStatObj.value = "RET";
    this.inputPagingObj.whereValue.push(WVProdStatObj);
  }

  EditButtonClick(e)
  {
    
    if(e.RowObj.DraftProdHId == null)
    {
      this.router.navigate(["/Product/HOadd"], { queryParams: { "ProdHId": e.RowObj.prodHId, "mode" : "edit" } });
    }
    else
    {
      this.router.navigate(["/Product/HOadd"], { queryParams: { "ProdHId": e.RowObj.DraftProdHId, "mode" : "edit" } });
    }
  }

}
