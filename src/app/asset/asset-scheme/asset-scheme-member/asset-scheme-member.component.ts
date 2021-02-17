import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { HttpClient } from '@angular/common/http';
import { AssetSchemeHObj } from 'app/shared/model/AssetSchemeHObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-scheme-member',
  templateUrl: './asset-scheme-member.component.html'
})

export class AssetSchemeMemberComponent implements OnInit {
  AssetSchmHId: number;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  assetSchmHObj: AssetSchemeHObj;
  AssetSchmHIsSystem: false;
  
  readonly CancelLink: string = NavigationConstant.ASSET_SCHM_PAGING;
  readonly AddLink: string = NavigationConstant.ASSET_SCHM_ADD_MBR;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["AssetSchmHId"] != null) {
        this.AssetSchmHId = params["AssetSchmHId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewAssetSchemeMember.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.inputPagingObj._url = "./assets/ucpaging/searchAssetSchemeMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetSchemeMember.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetSchmD;

    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'ASD.ASSET_SCHM_H_ID';
    critObj.value = this.AssetSchmHId.toString();

    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;

    this.assetSchmHObj = new AssetSchemeHObj();
    this.assetSchmHObj.AssetSchmHId = this.AssetSchmHId;
    this.http.post(URLConstant.GetAssetSchmHById, this.assetSchmHObj).subscribe(
      (response: AssetSchemeHObj) => {
        this.assetSchmHObj = response;
        this.AssetSchmHIsSystem = response.IsSystem;
      }
    );
  }
}