import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-mapping-asset-usage-detail',
  templateUrl: './mapping-asset-usage-detail.component.html',
  styleUrls: ['./mapping-asset-usage-detail.component.css']
})
export class MappingAssetUsageDetailComponent implements OnInit {

  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  inputPagingObj: UcPagingObj = new UcPagingObj();
  AssetUsageCode: string;

  readonly CancelLink: string = NavigationConstant.MAPPING_ASSET_USAGE_PAGING;
  readonly AddLink: string = NavigationConstant.MAPPING_ASSET_USAGE_ADD;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetUsageCode"] != null) {
        this.AssetUsageCode = params["AssetUsageCode"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewMappingAssetUsageDetail.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchMappingAssetUsageAssetCategory.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchMappingAssetUsageAssetCategory.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetCategoryUsageMap;

    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "ACUM.MR_ASSET_USAGE_CODE";
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.AssetUsageCode;
    this.inputPagingObj.addCritInput.push(critObj);
  }

}
