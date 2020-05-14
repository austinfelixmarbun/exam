import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prod-offering-paging',
  templateUrl: './prod-offering-paging.component.html',
  styleUrls: ['./prod-offering-paging.component.scss']
})
export class ProdOfferingPagingComponent implements OnInit {

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
