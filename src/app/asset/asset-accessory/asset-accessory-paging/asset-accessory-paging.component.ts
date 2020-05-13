import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-asset-accessory-paging',
  templateUrl: './asset-accessory-paging.component.html',
  styleUrls: ['./asset-accessory-paging.component.scss']
})
export class AssetAccessoryPagingComponent implements OnInit {
  AssetTypeId: number;
  inputPagingObj: UcPagingObj;
  viewObj: string;
  arrCrit: Array<CriteriaObj>;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
    });
  }
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetAccessory.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetAccessory.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetAccessory;
    this.viewObj = "./assets/ucviewgeneric/viewAssetType.json";
    this.arrCrit = new Array<CriteriaObj>();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionLike;
    critObj.propName = 'ASSET_TYPE_ID';
    critObj.value = this.AssetTypeId.toString();
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }
}
