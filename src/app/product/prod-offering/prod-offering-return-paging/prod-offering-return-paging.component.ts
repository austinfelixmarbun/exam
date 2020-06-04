import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

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
    this.inputPagingObj._url = "./assets/ucpaging/product/searchProductOffering.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = "/RefBank/DeleteRefBank";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/product/searchProductOffering.json";

    var criteriaList = new Array<CriteriaObj>();
    var criteriaObj = new CriteriaObj();
    criteriaObj.restriction = AdInsConstant.RestrictionEq;
    criteriaObj.propName = 'C.PROD_STAT';
    criteriaObj.value = "RET";
    criteriaList.push(criteriaObj);

    this.inputPagingObj.addCritInput = criteriaList;
  }

  EditProdOfr(e)
  {
    if(e.RowObj.DraftProdOfferingHId == null)
    {
      this.router.navigate(["/Product/ProdOffering/add"], { queryParams: { "ProdOfferingHId": e.RowObj.CurrentProdOfferingHId, "mode" : "edit" } });
    }
    else
    {
      this.router.navigate(["/Product/ProdOffering/add"], { queryParams: { "ProdOfferingHId": e.RowObj.DraftProdOfferingHId, "mode" : "edit" } });
    }
  }
}
