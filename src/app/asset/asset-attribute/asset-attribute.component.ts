import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
@Component({
  selector: 'app-asset-attribute',
  templateUrl: './asset-attribute.component.html',
  styleUrls: ['./asset-attribute.component.scss']
})
export class AssetAttributeComponent implements OnInit {

  AssetTypeId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  critObj: CriteriaObj = new CriteriaObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetTypeId"] != null) {
        this.AssetTypeId = params["AssetTypeId"];
      }
    });
  }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetAttribute.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetAttribute.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
    
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetType.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.critObj.restriction = AdInsConstant.RestrictionLike;
    this.critObj.propName = 'ASSET_TYPE_ID';
    this.critObj.value = this.AssetTypeId.toString();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

}
