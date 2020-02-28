import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asset-category-paging',
  templateUrl: './asset-category-paging.component.html',
  styleUrls: ['./asset-category-paging.component.scss']
})
export class AssetCategoryPagingComponent implements OnInit {

  AssetTypeCode:any;
  AssetTypeName:any;
  

  constructor(private route: ActivatedRoute) {
    

    this.route.queryParams.subscribe(params => {
      if (params["param"] != null) {
        this.AssetTypeName = params["AssetTypeName"];
      }
      if (params["AssetTypeCode"] != null) {
        this.AssetTypeCode = params["AssetTypeCode"];
      }
    });
   }
  inputPagingObj: any;
  viewObj:any;
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetCategory.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetCategory.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefEconomicSector;
    
    this.viewObj = "./assets/form-setting/assetCategory.json";
  }

}
