import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { Router, ActivatedRoute } from '@angular/router';
import { UcPagingObj, WhereValueObj } from '../../../shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-product-return-ho-paging',
  templateUrl: './product-return-ho-paging.component.html'
})
export class ProductReturnHoPagingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  inputPagingObj;
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url="./assets/ucpaging/product/searchProductHOReturn.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductHOReturn.json";

    
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
      AdInsHelper.RedirectUrl(this.router,["/Product/HOadd"],{ "ProdHId": e.RowObj.CurrentProdHId, "mode" : "edit", "source" : "return" });
    }
    else
    {
      AdInsHelper.RedirectUrl(this.router,["/Product/HOadd"],{ "ProdHId": e.RowObj.DraftProdHId, "mode" : "edit", "source" : "return" });
    }
  }
}
